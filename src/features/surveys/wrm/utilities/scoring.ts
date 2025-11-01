import { ARCHETYPE_KEYS, ArchetypeKey } from "../config";
import { ArchetypeScores, ScoringCategoryProps } from "../types";

export const getInitialScores = () => ARCHETYPE_KEYS.reduce((scores, archetypeKey) => ({
  ...scores,
  [archetypeKey]: 0,
}), {} as ArchetypeScores);

const getArchetype = (score: number, scores: ArchetypeScores) =>
  ARCHETYPE_KEYS.find((archetypeKey) => scores[archetypeKey] === score);

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

// const getRandomArchetype = (archetypes: ArchetypeKey[]) => {
//   const idx = Math.floor(Math.random() * archetypes.length);
//   return archetypes[idx];
// };

export const getOmittedArchetype = (scores: ArchetypeScores, seed: number): ArchetypeKey => {
  const randomIdx = Math.floor((seed * ARCHETYPE_KEYS.length) % ARCHETYPE_KEYS.length);
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
      const { lead: { key: archetype, score: trailerScore }, score: leadScore } = category;
      const difference = leadScore - trailerScore;
      // Omit the lead.
      if (difference > 1) return archetype;
      // Omit a random trailer.
      return ARCHETYPE_KEYS.filter((archetypeKey) => archetypeKey !== archetype)[randomIdx];
    case 'done':
      throw new Error('getOmittedArchetype is not for running against a completed test.');
  }
};
