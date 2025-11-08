import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { WRMQuestion } from "../config";
import { SurveyProgressProps } from "../../common/types";
import { SurveyProgress } from "../../common/components/Progress";

type RadioQuestionProps<T> = {
  isFirstQuestion: boolean;
  next: () => void;
  previous: () => void;
  progress: SurveyProgressProps,
  question: WRMQuestion;
  selectedAnswer: T | undefined;
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
  return (
    <FormControl>
      <SurveyProgress markers={markers} last={true} />
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
