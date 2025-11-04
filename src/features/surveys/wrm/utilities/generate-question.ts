import { Seeder } from "../../../../common/types";
import { getShuffledArray } from "../../../../common/utilities";
import { ArchetypeKey, WRMQuestion } from "../config";

export const generateQuestion = (
  [chosenQuestion, ...remainingQuestions]: WRMQuestion[],
  omit: ArchetypeKey,
  seeder: Seeder,
): {
  remainingQuestions: WRMQuestion[];
  question: WRMQuestion;
} => {
  const choices = getShuffledArray(chosenQuestion.choices
    .filter(({ value }) => value !== omit), seeder);
  return {
    remainingQuestions,
    question: {
      ...chosenQuestion,
      choices,
    },
  };
};
