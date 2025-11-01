import { CurrentPageChangingEvent } from "survey-core";
import { SurveyModel } from "survey-react-ui";

export const onCurrentPageChanging = (sender: SurveyModel, event: CurrentPageChangingEvent) => {
  // The first 9 pages should have been generated already.
  // Ideally check whether the list contains another question.
  // Maybe this needs to be a factory function, which may need to be passed a
    // function which gets the remaining questions.
  // Also check whether we're "done".
};
