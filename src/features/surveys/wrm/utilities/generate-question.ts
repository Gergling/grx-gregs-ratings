import { ArchetypeKey, WRMQuestion } from "../config";

export const generateQuestion = (
  [chosenQuestion, ...remainingQuestions]: WRMQuestion[],
  omit: ArchetypeKey,
): {
  remainingQuestions: WRMQuestion[];
  question: WRMQuestion;
} => {
  const choices = chosenQuestion.choices.filter(({ value }) => value !== omit);
  return {
    remainingQuestions,
    question: {
      ...chosenQuestion,
      choices,
    },
  };
};
