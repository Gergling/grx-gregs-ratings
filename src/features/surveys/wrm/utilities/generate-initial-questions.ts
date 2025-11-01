import { ARCHETYPE_KEYS, ArchetypeKey, WRMQuestion } from "../config";
import { generateQuestion } from "./generate-question";

const INITIAL_QUESTIONS_PER_ARCHETYPE = 3;
const archetypeKeys = Array
  .from({ length: INITIAL_QUESTIONS_PER_ARCHETYPE })
  .reduce<ArchetypeKey[]>(
    (
      keys,
    ) => {
      return ([
        ...keys,
        ...ARCHETYPE_KEYS,
      ]);
    },
    []
  );

export const generateInitialQuestions = (remainingQuestions: WRMQuestion[]) => archetypeKeys.reduce(
  (
    acc, archetypeKey
  ) => {
    const {
      remainingQuestions,
      question
    } = generateQuestion(acc.remainingQuestions, archetypeKey);
    return {
      remainingQuestions,
      questions: [
        ...acc.questions,
        question,
      ],
    };
  }, {
    remainingQuestions,
    questions: [],
  } as {
    remainingQuestions: WRMQuestion[];
    questions: WRMQuestion[];
  }
);
