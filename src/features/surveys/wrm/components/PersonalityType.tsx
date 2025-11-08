import { useWRMSurvey } from '../hooks/use-wrm-survey';
import { Pane } from '@gergling/ui-components';
import { RadioQuestion } from './RadioQuestion';

// TODO: We'll probably abstract this.
export const PersonalityType = () => {
  const {
    answers,
    navigateNextQuestion,
    navigatePreviousQuestion,
    navigation,
    progress,
    selectedAnswer,
    setSelectedAnswer,
  } = useWRMSurvey();

  return <div>
    <Pane>
      {true
        ? <RadioQuestion
          isFirstQuestion={navigation.isFirst}
          question={navigation.question}
          next={navigateNextQuestion}
          previous={navigatePreviousQuestion}
          progress={progress}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
        />
        : 'No question selected'
      }
    </Pane>
    <ul>
      {answers.map(({ answer }, idx) => <div key={idx}>{idx}: {answer}</div>)}
    </ul>
  </div>
};
