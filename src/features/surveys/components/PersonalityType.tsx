import { Model, Survey } from 'survey-react-ui';
import surveyConfig from '../../../../data/personality-type.json';

// TODO: We'll probably abstract this.
export const PersonalityType = () => {
  const survey = new Model(surveyConfig);
  return <Survey model={survey} />;
};