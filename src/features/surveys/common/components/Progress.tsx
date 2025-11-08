import { useTheme } from "@gergling/ui-components";
import { CheckCircle, CheckCircleOutline, Help, HelpOutline } from "@mui/icons-material";
import { SurveyProgressProps, SurveyProgressMarker } from "../types";
import { SurveyProgressMarkerDivider } from "./Progress.style";

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

const SurveyProgressMarkerComponent = (props: SurveyProgressMarker) => <>
  <SurveyProgressMarkerDivider />
  <SurveyProgressMarkerIcon {...props} />
</>;

export const SurveyProgress = ({ last, markers }: Omit<SurveyProgressProps, 'last'> & Partial<SurveyProgressProps>) => {
  const { theme: { colors: { primary } } } = useTheme();
  return <div style={{
    display: 'flex',
    justifyContent: 'center',
    gap: '0.1rem',
    color: primary.main,
    alignItems: 'center',
  }}>
    {markers.map((props, index) => (
      <SurveyProgressMarkerComponent key={index} {...props} />
    ))}

    {last && <>
      <SurveyProgressMarkerDivider partial={true} />
      <SurveyProgressMarkerIcon current={false} answered={false} />
    </>}
  </div>
};
