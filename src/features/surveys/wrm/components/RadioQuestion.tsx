import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { WRMQuestion } from "../config";

type RadioQuestionProps<T> = {
  isFirstQuestion: boolean;
  next: () => void;
  previous: () => void;
  question: WRMQuestion;
  selectedAnswer: T;
  setSelectedAnswer: (answer: T) => void;
};

export const RadioQuestion = <T,>({
  isFirstQuestion,
  next,
  previous,
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
        {!isFirstQuestion && <Button onClick={previous}>Previous</Button>}
        <Button onClick={next} disabled={!selectedAnswer}>Next</Button>
      </div>
    </FormControl>
  )
};
