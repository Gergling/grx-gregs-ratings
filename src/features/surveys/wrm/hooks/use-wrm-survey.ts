import { useCallback, useEffect, useMemo } from "react";
import { surveyStoreWRM } from "../stores";
import { Model } from "survey-react-ui";

export const useWRMSurvey = () => {
  const {
    initialise,
    setAnswer,
    setSeed,
  } = surveyStoreWRM();
  const [seed1] = useMemo(() => ([Math.random()]), []);
  const reset = useCallback(() => {
    initialise();
    setSeed(seed1);
  }, [initialise, seed1, setSeed]);
  const surveyConfig = useMemo(() => ({
  }), []);
  const survey = new Model(surveyConfig);

  // getInitialScores
  survey.onCurrentPageChanging.add(function (sender, options) {
    // Only execute custom logic when moving forward (Next button)
    if (!options.isNextPage) {
      return;
    }

    const questionElement = options.oldCurrentPage.elements[0];
    const questionName = questionElement.name;
    const answer = sender.getValue(questionName);
    console.log(answer)
    setAnswer(answer);

    // options.newCurrentPage = 
  });
  survey.onComplete.add(function (sender, options) {
    const results = sender.data;
    // The final results will contain the answers and the scores are finalized
    console.log("FINAL Survey Results:", results);
    // console.log("FINAL SCORING:", scores);

    // Since showCompletedPage: false, we can display a final message here
    // document.getElementById("surveyElement").innerHTML = "<div class='text-center text-2xl text-indigo-700 font-bold p-6 bg-indigo-100 rounded-xl shadow-lg'>Quiz Complete! Check the console for final scores and answers.</div>";
  });

  useEffect(() => reset(), [reset]);
};
