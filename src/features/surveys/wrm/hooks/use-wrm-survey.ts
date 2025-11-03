import { useCallback, useEffect, useMemo } from "react";
import { surveyStoreWRM } from "../stores/wrm-survey-store";

type ProgressMarker = {
  answered: boolean;
  current: boolean;
};

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
    setSeed,
    setSelectedAnswer,
  } = store;
  const [seed1] = useMemo(() => ([Math.random()]), []);
  const initialise = useCallback(() => {
    reset();
    setSeed(seed1);
  }, [reset, seed1, setSeed]);

  const isFirstQuestionSelected = useMemo(
    () => selectedQuestionIdx === 0,
    [selectedQuestionIdx]
  );
  const isAnswerSelected = useMemo(() => !!selectedAnswer, [selectedAnswer]);
  const markers: ProgressMarker[] = useMemo(() => {
    // 9-12 markers, depending on how many questions answered.
    const markers = [
      ...answers.map((_, idx) => ({ answered: true, current: selectedQuestionIdx === idx })),
      ...Array.from({ length: 9 - answers.length }, (_, idx) => ({ answered: false, current: selectedQuestionIdx === idx }))
    ];
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
