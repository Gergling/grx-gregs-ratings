import { useCallback, useEffect, useMemo } from "react";
import { surveyStoreWRM } from "../stores/wrm-survey-store";
import { ProgressMarker } from "../types";

export const useWRMSurvey = () => {
  const store = surveyStoreWRM();
  const {
    answers,
    navigateNextQuestion,
    navigatePreviousQuestion,
    questions,
    reset,
    selectedQuestion,
    selectedQuestionIdx,
    selectedAnswer,
    setSeeder,
    setSelectedAnswer,
  } = store;
  const initialise = useCallback(() => {
    setSeeder(() => Math.random());
    reset();
  }, [reset, setSeeder]);

  const isFirstQuestionSelected = useMemo(
    () => selectedQuestionIdx === 0,
    [selectedQuestionIdx]
  );
  const isAnswerSelected = useMemo(() => !!selectedAnswer, [selectedAnswer]);
  const markers: ProgressMarker[] = useMemo(() => {
    // 9-12 markers, depending on how many questions answered.
    const markers = [
      ...answers.map(() => ({ answered: true, current: false })),
      ...Array.from({ length: 9 - answers.length }, () => ({ answered: false, current: false }))
    ].map((props, idx) => ({ ...props, current: selectedQuestionIdx === idx }));
    return markers;
  }, [answers, selectedQuestionIdx]);
  // Give the last marker a dotted line between itself and the previous marker.
  const lastMarker = false;

  useEffect(() => initialise(), [initialise]);

  useEffect(() => {
    console.log('store', store)
  }, [store]);
  return {
    navigateNextQuestion,
    navigatePreviousQuestion,
    initialise,
    isAnswerSelected,
    isFirstQuestionSelected,
    progress: {
      markers,
      last: lastMarker,
    },
    questions,
    reset,
    selectedQuestion,
    selectedAnswer,
    setSelectedAnswer,
  };
};
