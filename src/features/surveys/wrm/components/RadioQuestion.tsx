import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { WRMQuestion } from "../config";
import { ProgressMarker } from "../types";
import { CheckCircle, CheckCircleOutline, Help, HelpOutline } from "@mui/icons-material";
import { useTheme } from "@gergling/ui-components";
import { ProgressMarkerDivider } from "./RadioQuestion.style";

const ProgressMarkerIcon = ({
  answered,
  current,
}: ProgressMarker) => {
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

const ProgressMarkerComponent = (props: ProgressMarker) => <>
  <ProgressMarkerDivider />
  <ProgressMarkerIcon {...props} />
</>;

type RadioQuestionProps<T> = {
  isFirstQuestion: boolean;
  next: () => void;
  previous: () => void;
  progress: {
    markers: ProgressMarker[];
    last: boolean;
  },
  question: WRMQuestion;
  selectedAnswer: T;
  setSelectedAnswer: (answer: T) => void;
};

export const RadioQuestion = <T,>({
  isFirstQuestion,
  next,
  previous,
  progress: {
    markers,
  },
  question: {
    choices,
    title
  },
  selectedAnswer,
  setSelectedAnswer,
}: RadioQuestionProps<T>) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(event.target.value as T);
  };
  const { theme: { colors: { primary } } } = useTheme();
  return (
    <FormControl>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '0.1rem',
        color: primary.main,
        alignItems: 'center',
      }}>
        {markers.map((props, index) => <ProgressMarkerComponent key={index} {...props} />)}
        <ProgressMarkerDivider partial={true} />
        <ProgressMarkerIcon current={false} answered={false} />
      </div>
      <FormLabel id="demo-radio-buttons-group-label">
        {title}
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        // defaultValue="female"
        name="radio-buttons-group"
        value={selectedAnswer || ''}
        onChange={handleChange}
      >
        {
          choices.map((choice, index) => (
            <FormControlLabel key={index} value={choice.value} control={<Radio />} label={choice.text} />
          ))
        }
      </RadioGroup>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      }}>
        <Button onClick={previous} disabled={isFirstQuestion}>Previous</Button>
        <Button onClick={next} disabled={!selectedAnswer}>Next</Button>
      </div>
    </FormControl>
  )
};
