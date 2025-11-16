import { Seeder } from "../../../../common/types";
import { getShuffledArray } from "../../../../common/utilities";
import { ArchetypeKey, WRMQuestion } from "../config";
import { ArchetypeScores, WRMSurveyPhase } from "../types";
import { getAdaptiveOmittedArchetype, getHighestScoringArchetype } from "./scoring";

export const generateQuestion = (
  [chosenQuestion, ...remainingQuestions]: WRMQuestion[],
  omit: ArchetypeKey,
  seeder: Seeder,
): {
  remainingQuestions: WRMQuestion[];
  question: WRMQuestion;
} => {
  const choices = getShuffledArray(
    chosenQuestion.choices.filter(
      ({ value }) => value !== omit
    ),
    seeder
  );
  return {
    remainingQuestions,
    question: {
      ...chosenQuestion,
      choices,
    },
  };
};

export const getOmittedArchetype = (
  phase: WRMSurveyPhase,
  scores: ArchetypeScores,
  seeder: Seeder
): ArchetypeKey => phase === 'initial'
  ? getHighestScoringArchetype(scores)
  : getAdaptiveOmittedArchetype(scores, seeder);
