import { Seeder } from "../../../../common/types";
import { ARCHETYPE_KEYS, ArchetypeKey } from "../config";
import { ArchetypeScores, ScoringCategoryProps, WRMStoreAnswer } from "../types";

export const getInitialScores = () => ARCHETYPE_KEYS.reduce((scores, archetypeKey) => ({
  ...scores,
  [archetypeKey]: 0,
}), {} as ArchetypeScores);

const getArchetype = (score: number, scores: ArchetypeScores) =>
  ARCHETYPE_KEYS.find((archetypeKey) => scores[archetypeKey] === score);

export const getHighestScoringArchetype = (
  scores: ArchetypeScores
): ArchetypeKey => {
  const [[archetype]] = Object
    .entries(scores)
    .sort(([keyA, scoreA], [keyB, scoreB]) => {
      if (scoreB !== scoreA) return scoreB - scoreA;
      return keyA.localeCompare(keyB); // Deterministic sort for ties
    });
  return archetype as ArchetypeKey;
};

export const getScoringCategory = (scores: ArchetypeScores): ScoringCategoryProps => {
  const scoreList = ARCHETYPE_KEYS.map((archetypeKey) => scores[archetypeKey]);
  const scoreSet = new Set(scoreList);
  
  if (scoreSet.size === 1) return { type: 'equal', score: scoreList[0] };

  const min = Math.min(...scoreSet);
  const max = Math.max(...scoreSet);
  const leadKey = getArchetype(max, scores);
  const trailerKey = getArchetype(min, scores);

  if (!leadKey || !trailerKey) throw new Error('Something has gone very wrong.');

  const [otherKey] = ARCHETYPE_KEYS.filter((archetypeKey) => ![leadKey, trailerKey].includes(archetypeKey));

  if (scoreSet.size === scoreList.length) return {
    type: 'done',
    trailer: {
      key: trailerKey,
      score: scores[trailerKey],
    },
    lead: {
      key: leadKey,
      score: scores[leadKey],
    },
    other: {
      key: otherKey,
      score: scores[otherKey],
    },
  };


  if (scores[otherKey] === max) return {
    type: 'lead',
    trailer: {
      key: trailerKey,
      score: scores[trailerKey],
    },
    score: scores[leadKey],
  };

  return {
    type: 'trailer',
    lead: {
      key: leadKey,
      score: scores[leadKey],
    },
    score: scores[trailerKey],
  };
};

export const getAdaptiveOmittedArchetype = (scores: ArchetypeScores, seeder: Seeder): ArchetypeKey => {
  const randomIdx = Math.floor((seeder() * ARCHETYPE_KEYS.length) % ARCHETYPE_KEYS.length);
  const category = getScoringCategory(scores);
  const { type } = category;
  switch (type) {
    case 'equal':
      // Get a random archetype.
      return ARCHETYPE_KEYS[randomIdx];
    case 'lead':
      // Omit the trailer.
      return category.trailer.key;
    case 'trailer':
      // Discern the difference between the lead and trailing scores.
      const { lead: { key: leadArchetype, score: leadScore }, score: trailerScore } = category;
      const difference = leadScore - trailerScore;
      // Omit the lead.
      if (difference > 1) return leadArchetype;
      // Omit a random trailer.
      const trailers = ARCHETYPE_KEYS.filter((archetypeKey) => archetypeKey !== leadArchetype);
      return trailers[Math.floor(seeder() * trailers.length)];
    case 'done':
      throw new Error('getAdaptiveOmittedArchetype is not for running against a completed test.');
  }
};

export const getScores = (
  answers: WRMStoreAnswer[]
): ArchetypeScores => answers.reduce(
  (scores, { answer }) => ({
    ...scores,
    [answer]: scores[answer] + 1,
  }),
  getInitialScores()
);
