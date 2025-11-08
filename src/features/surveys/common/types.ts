export type SurveyProgressMarker = {
  answered: boolean;
  current: boolean;
};

export type SurveyProgressProps = {
  markers: SurveyProgressMarker[];
  last: boolean;
};
