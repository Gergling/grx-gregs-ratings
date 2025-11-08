import { ReactNode } from "react";

export type SurveyProgressMarker = {
  answered: boolean;
  current: boolean;
  onClick?: () => void;
};

export type SurveyProgressProps = {
  last: boolean;
  markers: SurveyProgressMarker[];
};

export type SurveryControlProps = {
  label: ReactNode;
  handleNext: () => void;
  handlePrevious: () => void;
  isNextEnabled: boolean;
  isPreviousEnabled: boolean;
};
