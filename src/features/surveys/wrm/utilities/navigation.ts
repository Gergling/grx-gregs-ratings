import { ArchetypeKey } from "../config";
import { WRMStoreAnswer, WRMStoreProps } from "../types";
import { generateQuestion, getOmittedArchetype } from "./question";
import { getScores } from "./scoring";
import { getNavigation, getPhase, isLastPage } from "./update";

const getAnswers = (
  state: WRMStoreProps,
  answer?: ArchetypeKey
): WRMStoreAnswer[] => {
  // If there is no answer selected, we can just leave it as is.
  if (!answer) return state.answers;

  // Check whether the current page is the last page.
  const currentPageIsLast = isLastPage(state.answers.length, state.page);

  // For the last page, if the user is attempting to move forward, we can append the answer.
  // TODO: Every navigation away from a page should always make sure the current page is set.
  // if (currentPageIsLast && page > state.page) {
  if (currentPageIsLast) {
    return [...state.answers, { answer, question: state.lastQuestion }];
  }

  return state.answers.map((props, answerPage) =>
    state.page === answerPage ? { ...props, answer } : props
  );
};

export const navigateQuestionFactory = (
  page: number,
  answer?: ArchetypeKey
) => (state: WRMStoreProps): WRMStoreProps => {
  const {
    // isLast: currentPageIsLast,
    question: currentQuestion,
  } = getNavigation(state.answers, state.lastQuestion, state.page);

  // If an answer is chosen, make sure it is updated for the current question.
  const answers = getAnswers(state, answer);

  const scores = getScores(answers);
  const phase = getPhase(answers.length, currentQuestion.choices, scores);

  // If we're done, we don't need to generate a new question.
  if (phase === 'done') return {
    ...state,
    answers,
    page,
  };

  // Check whether the next page will be the last page.
  const nextPageIsLast = isLastPage(answers.length, page);

  // If we have navigated to the last page, we need to generate the next page.
  if (nextPageIsLast) {
    const omittedArchetype = getOmittedArchetype(phase, scores, state.seeder);
    const {
      remainingQuestions: questions,
      question: lastQuestion,
    } = generateQuestion(state.questions, omittedArchetype, state.seeder);

    return {
      ...state,
      answers,
      questions,
      lastQuestion,
      page,
    };
  }

  // If we're not navigating to the last page, we can just update the page
  // number.
  return {
    ...state,
    answers,
    page,
  };
};
