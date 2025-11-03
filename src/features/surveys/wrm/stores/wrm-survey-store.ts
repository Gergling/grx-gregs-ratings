import { create } from "zustand";
import { ArchetypeKey, QUESTIONS_WRM, WRMQuestion } from "../config";
import { ArchetypeScores } from "../types";
import { getInitialScores, getOmittedArchetype } from "../utilities/scoring";
import { generateQuestion } from "../utilities/generate-question";

type Questions = {
  remaining: WRMQuestion[];
  current: WRMQuestion;
};

type Answer = {
  question: WRMQuestion;
  answer: ArchetypeKey;
};

type State = {
  answers: Answer[];
  // navigation: {
  //   isLast: boolean;
  //   isFirst: boolean;
  //   idx: number;
  //   question: WRMQuestion;
  //   answer?: ArchetypeKey;
  // };
  questions: Questions;
  scores: ArchetypeScores;
  seed: number;
  selectedAnswer?: ArchetypeKey;
  selectedQuestion: WRMQuestion;
  selectedQuestionIdx: number;
};

type StateOp = (state: State) => State;

type Action = {
  setSeed: (seed: number) => void;
  setSelectedAnswer: (answer: ArchetypeKey | undefined) => void;
  navigateNextQuestion: () => void;
  navigatePreviousQuestion: () => void;
  reset: () => void;
};

// Previous question: reduces idx and therefore changes the selected question.
// Next question: increases idx and therefore changes the selected question. Generates a new one if it's the last one.
// Set seed: Just sets the seed.
// Select an answer: Just selects an answer to the selected question.

const runReducers = (
  initialState: State,
  reducers: ((state: State) => State)[],
): State => reducers.reduce((state, reducer) => reducer(state), initialState);

const updateSelectedQuestion: StateOp = (state) => {
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

const chooseBiasedQuestion: StateOp = (state) => {
  const omittedArchetype = getOmittedArchetype(state.scores, state.seed);
  const {
    remainingQuestions: remaining,
    question: current,
  } = generateQuestion(state.questions.remaining, omittedArchetype);
  return {
    ...state,
    questions: {
      ...state.questions,
      current,
      remaining,
    },
  };
};

const popRemainingQuestion: StateOp = (state) => {
  const current = state.questions.remaining.pop();

  if (!current) throw new Error('We have run out of questions.');

  return {
    ...state,
    questions: {
      ...state.questions,
      current,
      remaining: state.questions.remaining,
    },
  };
};

const chooseNextQuestion: StateOp = (state) => {
  const nextQuestionReducer = state.answers.length > 8
    ? chooseBiasedQuestion
    : popRemainingQuestion;
  return runReducers(state, [
    nextQuestionReducer,
    updateSelectedQuestion,
  ]);
};

const updateScores = (
  state: State,
): State => {
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

const answerQuestion: StateOp = (state) => {
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

const navigatePreviousQuestion: StateOp = (state) => {
  const { selectedQuestionIdx } = state;
  if (selectedQuestionIdx <= 0) return state;
  return updateSelectedQuestion({
    ...state,
    selectedQuestionIdx: selectedQuestionIdx - 1,
  });
};
const navigateNextQuestion: StateOp = (state) => {
  const { selectedQuestionIdx: oldSelectedQuestionIdx } = state;
  const isOutsideRange = oldSelectedQuestionIdx >= state.answers.length;
  const selectedQuestionIdx = oldSelectedQuestionIdx + 1;

  if (isOutsideRange) return answerQuestion({ ...state, selectedQuestionIdx });

  return updateSelectedQuestion({
    ...state,
    selectedQuestionIdx,
  });
};

const getInitialState = (seed: number): State => {
  const allQuestions = QUESTIONS_WRM.sort(() => seed - 0.5);
  const scores = getInitialScores();
  return chooseNextQuestion({
    scores,
    questions: { current: allQuestions[0], remaining: allQuestions },
    answers: [],
    seed,
    selectedAnswer: undefined,
    selectedQuestion: allQuestions[0],
    // selectedQuestionCategory: 'latest',
    selectedQuestionIdx: 0,
  });
  // const selectedQuestion = getSelectedQuestion([], initialState.questions.current, 0, false);
  // return { ...initialState, selectedQuestion };
};


export const surveyStoreWRM = create<State & Action>((set, get) => {
  // const getNextQuestions = (scores: ArchetypeScores, remaining: WRMQuestion[]): Questions => {
  //   const { answers, seed } = get();
  //   const questions: Questions = answers.length > 8
  //     ? getQuestion(scores, seed, remaining)
  //     : popUpcoming(remaining);
  //   return questions;
  // };
  // const isValidQuestionIdx = (selectedQuestionIdx: number) => {
  //   const { answers } = get();
  //   return selectedQuestionIdx >= answers.length;
  // };
  const reset = () => {
    const { seed } = get();
    const initialState = getInitialState(seed);
    set(initialState);
  };
  const initialState = getInitialState(0);
  return {
    ...initialState,
    // answers: [],
    // questions: { remaining: [] },
    // scores: getInitialScores(),
    // seed: 0,
    // selectedAnswer: undefined,
    // selectedQuestionIdx: 0,

    // generateNextQuestion: () => {
    //   const {
    //     answers,
    //     questions: { remaining, current: answered },
    //     scores: oldScores,
    //     selectedAnswer: answer,
    //     selectedQuestionIdx: oldSelectedQuestionIdx,
    //   } = get();

    //   if (!answer) throw new Error('How is there no selected answer at this stage?');

    //   const scores = { ...oldScores, [answer]: oldScores[answer] + 1 };
    //   const questions: Questions = getNextQuestions(scores, remaining);
    //   const selectedQuestionIdx = oldSelectedQuestionIdx + 1;

    //   const selectedQuestion = getSelectedQuestion(answers, questions.current, selectedQuestionIdx, isValidQuestionIdx(selectedQuestionIdx));

    //   set({
    //     answers: [...answers, { question: answered, answer }],
    //     questions,
    //     scores,
    //     selectedAnswer: undefined,
    //     selectedQuestion,
    //     selectedQuestionIdx: selectedQuestionIdx + 1,
    //   });
    // },
    navigatePreviousQuestion: () => {
      set(navigatePreviousQuestion);
    },
    navigateNextQuestion: () => {
      set(navigateNextQuestion);
    },
    reset,
    setSelectedAnswer: (selectedAnswer) => set({ selectedAnswer }),
    // setSelectedQuestionIdx: (selectedQuestionIdx) => {
    //   if (selectedQuestionIdx <= 0) return;

    //   const { answers, questions } = get();
    //   const isValidIdx = isValidQuestionIdx(selectedQuestionIdx);
    //   const selectedAnswer = isValidIdx ? undefined : answers[selectedQuestionIdx].answer;
    //   const selectedQuestion = getSelectedQuestion(answers, questions.current, selectedQuestionIdx, isValidIdx);

    //   set({ selectedAnswer, selectedQuestion, selectedQuestionIdx });
    // },
    setSeed: (seed) => set({ seed }),
  };
});
