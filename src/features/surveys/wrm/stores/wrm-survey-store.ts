import { create } from "zustand";
import { ArchetypeKey, QUESTIONS_WRM } from "../config";
import { WRMState, WRMStoreOp, WRMStoreProps } from "../types";
import { getInitialScores, getOmittedArchetype } from "../utilities/scoring";
import { generateQuestion } from "../utilities/generate-question";
import { getShuffledArray } from "../../../../common/utilities/array";
import { Seeder } from "../../../../common/types";
import { runReducers } from "../../../../common/utilities/store";

// Previous question: reduces idx and therefore changes the selected question.
// Next question: increases idx and therefore changes the selected question. Generates a new one if it's the last one.
// Set seed: Just sets the seed.
// Select an answer: Just selects an answer to the selected question.

const updateSelectedQuestion: WRMStoreOp = (state) => {
  const { answers, questions: { current }, selectedQuestionIdx } = state;
  const isInRange = selectedQuestionIdx >= answers.length;
  const selectedQuestion = isInRange
    ? current
    : answers[selectedQuestionIdx].question;
  // TODO: User won't get their answer stored if they choose one and navigate back to a previous question.
  const selectedAnswer = isInRange
    ? undefined
    : answers[selectedQuestionIdx].answer;

  return {
    ...state,
    // navigation: {
    //   ...state.navigation,
    //   isLast: idx >= answers.length,
    //   isFirst: idx === 0,
    //   question: selectedQuestion,
    //   answer: selectedAnswer,
    // },
    selectedAnswer,
    selectedQuestion,
  };
};

const chooseBiasedQuestion: WRMStoreOp = (state) => {
  const omittedArchetype = getOmittedArchetype(state.scores, state.seeder);
  const {
    remainingQuestions: remaining,
    question: current,
  } = generateQuestion(state.questions.remaining, omittedArchetype, state.seeder);
  return {
    ...state,
    questions: {
      ...state.questions,
      current,
      remaining,
    },
  };
};

const popRemainingQuestion: WRMStoreOp = (state) => {
  // Choose an archetype based on what already exists in the answers
  // We want 3 of each kind, so we should calculate how many against teh answers
  // Array.from({ length: ARCHETYPE_KEYS.length });
  const scores = state.answers.reduce((scores, { answer }) => ({
    ...scores,
    [answer]: scores[answer] + 1,
  }), getInitialScores());
  const [[archetype]] = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  // Choose the first archetype to exceed 3 points or just any archetype.
  const {
    remainingQuestions: remaining,
    question: current,
  } = generateQuestion(state.questions.remaining, archetype as ArchetypeKey, state.seeder);

  return {
    ...state,
    questions: {
      ...state.questions,
      current,
      remaining,
    },
  };
};

const chooseNextQuestion: WRMStoreOp = (state) => {
  // 8 needs to be calculated from the number of archetypes total multiplied by the arbitrary number 3, and we can use >=
  const nextQuestionReducer = state.answers.length > 8
    ? chooseBiasedQuestion
    : popRemainingQuestion;
  return runReducers(state, [
    nextQuestionReducer,
    updateSelectedQuestion,
  ]);
};

const updateScores: WRMStoreOp = (state) => {
  const scores = state.answers.reduce((scores, { answer }) => {
    return {
      ...scores,
      [answer]: scores[answer] + 1,
    };
  }, getInitialScores());

  return {
    ...state,
    scores,
  };
};

const answerQuestion: WRMStoreOp = (state) => {
  return runReducers(state, [
    (state) => {
      if (!state.selectedAnswer) throw new Error('How is there no selected answer at this stage?');

      return {
        ...state,
        answers: [
          ...state.answers,
          {
            answer: state.selectedAnswer,
            question: state.selectedQuestion,
          }
        ],
        selectedAnswer: undefined,
        // selectedQuestionIdx: state.selectedQuestionIdx + 1,
      };
    },
    updateScores,
    chooseNextQuestion,
  ]);
};

const navigatePreviousQuestion: WRMStoreOp = (state) => {
  const { selectedQuestionIdx } = state;
  if (selectedQuestionIdx <= 0) return state;
  return updateSelectedQuestion({
    ...state,
    selectedQuestionIdx: selectedQuestionIdx - 1,
  });
};
const navigateNextQuestion: WRMStoreOp = (state) => {
  const { selectedQuestionIdx: oldSelectedQuestionIdx } = state;
  const isOutsideRange = oldSelectedQuestionIdx >= state.answers.length;
  const selectedQuestionIdx = oldSelectedQuestionIdx + 1;

  if (isOutsideRange) return answerQuestion({ ...state, selectedQuestionIdx });

  return updateSelectedQuestion({
    ...state,
    selectedQuestionIdx,
  });
};

const getInitialState = (seeder: Seeder): WRMState => {
  const questions = getShuffledArray(QUESTIONS_WRM, seeder);
  const scores = getInitialScores();
  const archetype = getOmittedArchetype(scores, seeder);
  const {
    question: current,
    remainingQuestions: remaining,
  } = generateQuestion(questions, archetype, seeder);
  return {
    scores,
    questions: { current, remaining },
    answers: [],
    seeder,
    selectedAnswer: undefined,
    selectedQuestion: current,
    selectedQuestionIdx: 0,
  };
};

export const surveyStoreWRM = create<WRMStoreProps>((set) => {
  return {
    ...getInitialState(() => 0),
    navigatePreviousQuestion: () => {
      set(navigatePreviousQuestion);
    },
    navigateNextQuestion: () => {
      set(navigateNextQuestion);
    },
    reset: () => set((store) => {
      const state = getInitialState(store.seeder);
      return {
        ...store,
        ...state,
      };
    }),
    setSelectedAnswer: (selectedAnswer) => set({ selectedAnswer }),
    setSeeder: (seeder) => set({ seeder }),
  };
});
