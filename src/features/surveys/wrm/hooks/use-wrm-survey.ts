import { useCallback, useEffect, useMemo, useState } from "react";
import { surveyStoreWRM } from "../stores/wrm-survey-store";
import { TOTAL_INITIAL_QUESTIONS } from "../constants";
import { useSurveyProgress } from "../../common/hooks/use-progress";
import { ArchetypeKey } from "../config";
import { WRMState, WRMSurveyProps } from "../types";
import { getNavigation, getPhase, getScores } from "../utilities";

export const useWRMSurvey = (): WRMSurveyProps & {
  answers: WRMState['answers'];
} => {
  const store = surveyStoreWRM();
  const {
    answers,
    lastQuestion,
    navigateQuestion,
    page,
    reset,
    setSeeder,
  } = store;
  const [selectedAnswer, setSelectedAnswer] = useState<ArchetypeKey>();

  const initialise = useCallback(() => {
    setSeeder(() => Math.random());
    reset();
  }, [reset, setSeeder]);

  const navigation = useMemo(
    (): WRMSurveyProps['navigation'] => getNavigation(answers, lastQuestion, page),
    [answers, lastQuestion, page]
  );
  const scores = useMemo(
    () => getScores(answers),
    [answers]
  );
  const phase = useMemo(
    () => getPhase(answers, navigation.question.choices, scores),
    [answers, navigation.question.choices, scores]
  );

  const isAnswerSelected = useMemo(
    () => !!selectedAnswer,
    [selectedAnswer]
  );
  const lastMarker = useMemo(() => phase !== 'final', [phase]);
  const progress = useSurveyProgress(answers.length, page, TOTAL_INITIAL_QUESTIONS, lastMarker);

  const navigateAnyQuestion = useCallback((page: number) => {
    navigateQuestion(page, selectedAnswer);
  }, [navigateQuestion, selectedAnswer]);

  const navigatePreviousQuestion = useCallback(() => {
    navigateQuestion(page - 1, selectedAnswer);
  }, [navigateQuestion, page, selectedAnswer]);

  const navigateNextQuestion = useCallback(() => {
    navigateQuestion(page + 1, selectedAnswer);
  }, [navigateQuestion, page, selectedAnswer]);

  useEffect(() => initialise(), [initialise]);
  useEffect(
    () => setSelectedAnswer(answers[page]?.answer),
    [answers, page, setSelectedAnswer]
  );

  return {
    isAnswerSelected,
    navigateAnyQuestion,
    navigateNextQuestion,
    navigatePreviousQuestion,
    navigation,
    progress,
    phase,
    scores,
    selectedAnswer,
    setSelectedAnswer,

    // For testing:
    answers,
  };
};
