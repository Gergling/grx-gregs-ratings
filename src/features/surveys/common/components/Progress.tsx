import { CheckCircle, CheckCircleOutline, Help, HelpOutline } from "@mui/icons-material";
import { SurveyProgressProps, SurveyProgressMarker } from "../types";
import { StyledSurveyProgress, SurveyProgressMarkerDivider } from "./Progress.style";

const SurveyProgressMarkerIcon = ({
  answered,
  current,
}: SurveyProgressMarker) => {
  if (answered) {
    if (current) {
      return <CheckCircle />;
    }

    return <CheckCircleOutline />;
  }

  if (current) {
    return <Help />;
  }

  return <HelpOutline />;
};

// This can click through to a specific page.
// Will require a flexbox.
const SurveyProgressMarkerComponent = (props: SurveyProgressMarker) => <>
  <SurveyProgressMarkerDivider />
  <SurveyProgressMarkerIcon {...props} />
</>;

export const SurveyProgress = ({ last, markers }: Omit<SurveyProgressProps, 'last'> & Partial<SurveyProgressProps>) => {
  return <StyledSurveyProgress>
    {markers.map((props, index) => (
      <SurveyProgressMarkerComponent key={index} {...props} />
    ))}

    {last && <>
      <SurveyProgressMarkerDivider partial={true} />
      <SurveyProgressMarkerIcon current={false} answered={false} />
    </>}
  </StyledSurveyProgress>
};
