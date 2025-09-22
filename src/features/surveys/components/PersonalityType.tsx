import { Model, Survey } from 'survey-react-ui';
import surveyConfig from '../../../../data/personality-type.json';
import { useSJSTheme } from '../../../libs/surveyjs/hooks/use-sjs-theme';

// TODO: We'll probably abstract this.
export const PersonalityType = () => {
  // TODO: Use the theme and map the colours into surveyjs.
  const sJsTheme = useSJSTheme();
  // Can probably make a hook which just lives in libs/surveyjs for that.
  // Then we use the model object's `applyTheme` and just put the theme object into it.
  // The main things we care about are mapping the theme colours and fonts.
  const survey = new Model(surveyConfig);
  survey.applyTheme(sJsTheme);
  return <Survey model={survey} />;
};