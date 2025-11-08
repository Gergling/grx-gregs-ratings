import { ArchetypeKey } from "../config";
import { WRMStoreProps } from "../types";
import { generateQuestion, getOmittedArchetype } from "./question";
import { getScores } from "./scoring";
import { getNavigation, getPhase } from "./update";

export const navigateQuestionFactory = (
  page: number,
  answer?: ArchetypeKey
) => (state: WRMStoreProps): WRMStoreProps => {
  // Check whether the current page is the last page.
  const {
    isLast: currentPageIsLast,
  } = getNavigation(state.answers, state.lastQuestion, state.page);

  // If an answer is chosen, make sure it is updated for the current question.
  const answers = answer
    ? currentPageIsLast
      ? [...state.answers, { answer, question: state.lastQuestion }]
      : state.answers.map((props, answerPage) => {
        if (state.page === answerPage) return { ...props, answer };
        return props;
      })
    : state.answers;

  // Check whether the next page will be the last page.
  const {
    isLast: nextPageIsLast,
  } = getNavigation(answers, state.lastQuestion, page);

  // If we have navigated to the last page, we need to generate the next page.
  if (nextPageIsLast) {
    const scores = getScores(answers);
    const phase = getPhase(answers, state.lastQuestion.choices, scores);

    // If we have discerned that we are done with the questions, we can finish
    // up here.
    if (phase === 'done') return {
      ...state,
      answers,
      page,
    };

    // If we're not done, we need to generate the next question. find the omitted
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
