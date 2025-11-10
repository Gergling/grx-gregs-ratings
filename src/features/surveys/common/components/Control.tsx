import { Button, FormControl, FormLabel } from "@mui/material";
import { SurveyControlProps } from "../types";
import { PropsWithChildren } from "react";
import { SurveyControlNavigation } from "./Control.style";

export const SurveyControl = ({
  children,
  label,
  handleNext,
  handlePrevious,
  isNextEnabled,
  isPreviousEnabled,
  nextButtonText,
}: SurveyControlProps & PropsWithChildren) => (
  <FormControl>
    <FormLabel id="radio-buttons-group-label">
      {label}
    </FormLabel>
    {children}
    <SurveyControlNavigation>
      {handlePrevious && <Button onClick={handlePrevious} disabled={!isPreviousEnabled}>Previous</Button>}
      {handleNext && <Button onClick={handleNext} disabled={!isNextEnabled}>{nextButtonText || 'Next'}</Button>}
    </SurveyControlNavigation>
  </FormControl>
);
