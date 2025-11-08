import { useWRMSurvey } from '../hooks/use-wrm-survey';
import { Pane } from '@gergling/ui-components';
import { SurveyControl } from '../../common/components/Control';
import { SurveyProgress } from '../../common/components/Progress';
import { RadioGroup } from '../../common/components/RadioGroup';
import { useMemo } from 'react';

export const PersonalityType = () => {
  const {
    navigateNextQuestion,
    navigatePreviousQuestion,
    navigation,
    progress,
    selectedAnswer,
    setSelectedAnswer,
  } = useWRMSurvey();

  const options = useMemo(
    () => navigation.question.choices.map(({ text, ...props }) => ({ label: text, ...props })),
    [navigation.question.choices]
  );

  return <Pane>
    <SurveyProgress {...progress} />
    <SurveyControl
      label={navigation.question.title}
      handleNext={navigateNextQuestion}
      handlePrevious={navigatePreviousQuestion}
      isNextEnabled={!!selectedAnswer}
      isPreviousEnabled={!navigation.isFirst}
    >
      <RadioGroup
        options={options}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
      />
    </SurveyControl>
  </Pane>
};
