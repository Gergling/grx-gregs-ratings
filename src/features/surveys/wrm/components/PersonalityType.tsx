import { useWRMSurvey } from '../hooks/use-wrm-survey';
import { Pane } from '@gergling/ui-components';
import { RadioQuestion } from './RadioQuestion';

// Choose a survey: e.g. personality type.
// Get the questions and generate a model
// generateInitialQuestions

// TODO: We'll probably abstract this.
export const PersonalityType = () => {
  const {
    isFirstQuestionSelected,
    navigateNextQuestion,
    navigatePreviousQuestion,
    selectedAnswer,
    selectedQuestion,
    setSelectedAnswer,
  } = useWRMSurvey();

  return <div>
    <Pane>
      {selectedQuestion
        ? <RadioQuestion
          isFirstQuestion={isFirstQuestionSelected}
          question={selectedQuestion}
          next={navigateNextQuestion}
          previous={navigatePreviousQuestion}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
        />
        : 'No question selected'
      }
    </Pane>
  </div>
};
