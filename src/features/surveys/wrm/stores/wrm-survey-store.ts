import { create } from "zustand";
import { QUESTIONS_WRM } from "../config";
import { WRMState, WRMStoreProps } from "../types";
import { getShuffledArray } from "../../../../common/utilities/array";
import { Seeder } from "../../../../common/types";
import {
  generateQuestion,
  getAdaptiveOmittedArchetype,
  getInitialScores,
  navigateQuestionFactory,
} from "../utilities";

const getInitialState = (seeder: Seeder): WRMState => {
  const allShuffledQuestions = getShuffledArray(QUESTIONS_WRM, seeder);
  const scores = getInitialScores();
  const archetype = getAdaptiveOmittedArchetype(scores, seeder);
  const {
    question: lastQuestion,
    remainingQuestions: questions,
  } = generateQuestion(allShuffledQuestions, archetype, seeder);
  return {
    answers: [],
    lastQuestion,
    page: 0,
    questions,
    seeder,
  };
};

export const surveyStoreWRM = create<WRMStoreProps>((set) => {
  return {
    ...getInitialState(() => 0),
    navigateQuestion: (page, answer) => set(navigateQuestionFactory(page, answer)),
    reset: () => set((store) => {
      const state = getInitialState(store.seeder);
      return {
        ...store,
        ...state,
      };
    }),
    setSeeder: (seeder) => set({ seeder }),
  };
});
