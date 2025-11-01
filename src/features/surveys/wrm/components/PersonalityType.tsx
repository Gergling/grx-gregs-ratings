import { Model, Survey } from 'survey-react-ui';
import surveyConfig from '../personality-type.json';
import { useSJSTheme } from '../../../../libs/surveyjs/hooks/use-sjs-theme';

// Choose a survey: e.g. personality type.
// Get the questions and generate a model
// generateInitialQuestions

// TODO: We'll probably abstract this.
export const PersonalityType = () => {
  // TODO: Use the theme and map the colours into surveyjs.
  const sJsTheme = useSJSTheme();
  // Can probably make a hook which just lives in libs/surveyjs for that.
  // Then we use the model object's `applyTheme` and just put the theme object into it.
  // The main things we care about are mapping the theme colours and fonts.
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

    // Update the scores
    // getScoringCategory

    // getOmittedArchetype
    // generateQuestion
  });
  survey.onComplete.add(function (sender, options) {
    const results = sender.data;
    // The final results will contain the answers and the scores are finalized
    console.log("FINAL Survey Results:", results);
    // console.log("FINAL SCORING:", scores);

    // Since showCompletedPage: false, we can display a final message here
    // document.getElementById("surveyElement").innerHTML = "<div class='text-center text-2xl text-indigo-700 font-bold p-6 bg-indigo-100 rounded-xl shadow-lg'>Quiz Complete! Check the console for final scores and answers.</div>";
  });
  survey.applyTheme(sJsTheme);
  return <Survey model={survey} />;
};

// Survey object:
// title: "The Class Assignment Quiz",
//             description: "Answer these questions to determine your destiny!",
//             showQuestionNumbers: "off",
//             showProgressBar: "top", // Show progress bar at the top
//             showCompletedPage: false, // CRITICAL: Disable default completion page
            
//             pages: [
//                 // === QUESTION 1 ===
//                 {
//                     name: "page_q1",
//                     elements: [
//                         {
//                             type: "radiogroup",
//                             name: "q1_conflict",
//                             title: "You encounter a locked door. What do you do?",
//                             isRequired: true,
//                             choices: [
//                                 { value: "A", text: "Smash it down with force." },
//                                 { value: "B", text: "Look for hidden magical runes to dispel the lock." },
//                                 { value: "C", text: "Search for a tiny, unnoticed pressure plate or keyhole." }
//                             ]
//                         }
//                     ]
//                 },