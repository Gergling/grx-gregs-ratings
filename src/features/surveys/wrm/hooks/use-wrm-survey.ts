import { useCallback, useEffect, useMemo, useState } from "react";
import { surveyStoreWRM } from "../stores/wrm-survey-store";
import { TOTAL_INITIAL_QUESTIONS } from "../constants";
import { useSurveyProgress } from "../../common/hooks/use-progress";
import { ArchetypeKey } from "../config";
import { WRMSurveyProps } from "../types";
import { getNavigation, getPhase, getScores } from "../utilities";
import { SurveyControlProps } from "../../common/types";

export const useWRMSurvey = (): WRMSurveyProps => {
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
    () => getPhase(answers.length, navigation.question.choices, scores),
    [answers, navigation.question.choices, scores]
  );

  const lastMarker = useMemo(() => phase !== 'done', [phase]);
  const progress = useSurveyProgress(answers.length, page, TOTAL_INITIAL_QUESTIONS, lastMarker);

  const isComplete = useMemo(
    () => phase === 'done' && page >= answers.length,
    [answers.length, page, phase]
  );

  // TODO: For allowing click-through on progress.
  // const navigateAnyQuestion = useCallback((page: number) => {
  //   navigateQuestion(page, selectedAnswer);
  // }, [navigateQuestion, selectedAnswer]);

  const navigatePreviousQuestion = useCallback(() => {
    navigateQuestion(page - 1, selectedAnswer);
  }, [navigateQuestion, page, selectedAnswer]);

  const navigateNextQuestion = useCallback(() => {
    navigateQuestion(page + 1, selectedAnswer);
  }, [navigateQuestion, page, selectedAnswer]);

  const surveyControlProps = useMemo(
    (): SurveyControlProps => {
      const handleNext = navigateNextQuestion;
      const handlePrevious = navigatePreviousQuestion;
      const isNextEnabled = !!selectedAnswer;
      const isPreviousEnabled = !navigation.isFirst;
      const label = navigation.question.title;
      const nextButtonText = 'Next';
      return {
        handleNext,
        handlePrevious,
        isNextEnabled,
        isPreviousEnabled,
        label,
        nextButtonText,
      };
    },
    [navigation, navigateNextQuestion, navigatePreviousQuestion, selectedAnswer]
  );

  useEffect(() => initialise(), [initialise]);
  useEffect(
    () => setSelectedAnswer(answers[page]?.answer),
    [answers, page, setSelectedAnswer]
  );

  return {
    isComplete,
    navigation,
    progress,
    scores,
    selectedAnswer,
    setSelectedAnswer,
    surveyControlProps,
  };
};
