import { Button, FormControl, FormLabel } from "@mui/material";
import { SurveryControlProps } from "../types";
import { PropsWithChildren } from "react";
import { SurveyControlNavigation } from "./Control.style";

export const SurveyControl = ({
  children,
  label,
  handleNext,
  handlePrevious,
  isNextEnabled,
  isPreviousEnabled,
}: SurveryControlProps & PropsWithChildren) => (
  <FormControl>
    <FormLabel id="radio-buttons-group-label">
      {label}
    </FormLabel>
    {children}
    <SurveyControlNavigation>
      <Button onClick={handlePrevious} disabled={!isPreviousEnabled}>Previous</Button>
      <Button onClick={handleNext} disabled={!isNextEnabled}>Next</Button>
    </SurveyControlNavigation>
  </FormControl>
);
