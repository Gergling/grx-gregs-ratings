import { TOTAL_INITIAL_QUESTIONS } from "../constants";
import { WRMState, WRMSurveyPhase, WRMSurveyProps } from "../types";
import { getScoringCategory } from "./scoring";

export const getPhase = (
  totalAnswers: number,
  choices: WRMSurveyProps['navigation']['question']['choices'],
  scores: WRMSurveyProps['scores']
): WRMSurveyPhase => {
  // Check whether we're done with the initial questions yet.
  if (totalAnswers < TOTAL_INITIAL_QUESTIONS) return 'initial';

  // Since we're done with the initial questions, check whether we're done
  // altogether.
  if (getScoringCategory(scores).type === 'done') return 'done';

  // If we're generating adaptive questions and we're not done, we can
  // simulate whether the current question will be the final question by
  // testing both answers.
  const categories = choices.map(({ value }) => getScoringCategory({
    ...scores,
    [value]: scores[value] + 1
  }).type);

  return categories.every((category) => category === 'done') ? 'final' : 'adaptive';
};

// We should always update the current question if the answer for it has
// changed or the current question has changed.
export const isLastPage = (
  totalAnswers: number,
  page: number
) => page >= totalAnswers;

export const getNavigation = (
  answers: WRMState['answers'],
  lastQuestion: WRMState['lastQuestion'],
  page: number
): WRMSurveyProps['navigation'] => {
  const isFirst = page === 0;
  const isLast = isLastPage(answers.length, page);
  const question = isLast
    ? lastQuestion
    : answers[page].question;

  return {
    isLast,
    isFirst,
    question,
  };
};
