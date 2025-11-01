import { create } from "zustand";
import { ArchetypeKey, QUESTIONS_WRM, WRMQuestion } from "./config";
import { ArchetypeScores } from "./types";
import { getInitialScores, getOmittedArchetype } from "./utilities/scoring";
import { generateQuestion } from "./utilities/generate-question";

type Questions = {
  remaining: WRMQuestion[];
  current?: WRMQuestion;
};

type Answer = {
  question: WRMQuestion;
  answer: ArchetypeKey;
};

const popUpcoming = (
  remaining: WRMQuestion[],
): Questions => {
  const current = remaining.pop();
  return {
    current,
    remaining,
  };
};

const getQuestion = (
  scores: ArchetypeScores,
  seed: number,
  remaining: WRMQuestion[],
): Questions => {
  const omittedArchetype = getOmittedArchetype(scores, seed);
  const {
    remainingQuestions,
    question,
  } = generateQuestion(remaining, omittedArchetype);
  return {
    current: question,
    remaining: remainingQuestions,
  };
};

export const surveyStoreWRM = create<{
  answers: Answer[];
  questions: Questions;
  scores: ArchetypeScores;
  seed: number;
  initialise: () => void;
  setAnswer: (answer: ArchetypeKey) => void;
  setSeed: (seed: number) => void;
}>((set, get) => {
  const getNextQuestions = (scores: ArchetypeScores, remaining: WRMQuestion[]): Questions => {
    const { answers, seed } = get();
    const questions: Questions = answers.length > 8
      ? getQuestion(scores, seed, remaining)
      : popUpcoming(remaining);
    return questions;
  };
  const initialise = () => {
    const { seed } = get();
    const allQuestions = QUESTIONS_WRM.sort(() => seed - 0.5);
    const scores = getInitialScores();
    const questions = getNextQuestions(scores, allQuestions);
    set({ questions, scores });
  };
  return {
    answers: [],
    questions: { remaining: [] },
    scores: getInitialScores(),
    seed: 0,
    initialise,
    setAnswer: (answer: ArchetypeKey) => {
      const {
        answers,
        questions: { remaining, current: answered },
        scores: oldScores,
      } = get();
      const scores = { ...oldScores, [answer]: oldScores[answer] + 1 };

      if (!answered) throw new Error('How is there no current question at this stage?');

      const questions: Questions = getNextQuestions(scores, remaining);

      set({
        answers: [...answers, { question: answered, answer }],
        questions,
        scores,
      });
    },
    setSeed: (seed: number) => set({ seed }),
  };
});
