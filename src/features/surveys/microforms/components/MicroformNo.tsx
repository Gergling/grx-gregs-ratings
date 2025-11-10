import { Pane } from "@gergling/ui-components";
import { useMemo, useState } from "react";
import { SurveyControl } from "../../common/components/Control";
import { RadioGroup } from "../../common/components/RadioGroup";
import { Microform } from "../../../../libs/sanity";

type MicroformNoProps = {
  label: Microform['label'];
  onDone: () => void;
};

type OptionValue = 'no' | undefined;

const options: { label: string; value: OptionValue; }[] = [{ label: 'No', value: 'no' }];

export const MicroformNo = ({ label, onDone }: MicroformNoProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<OptionValue>(undefined);
  const nextButtonText = useMemo(() => selectedAnswer ? 'Done' : 'Next', [selectedAnswer]);

  return <Pane>
    <SurveyControl
      label={label}
      handleNext={onDone}
      isNextEnabled={selectedAnswer !== undefined}
      nextButtonText={nextButtonText}
    >
      <RadioGroup<OptionValue>
        options={options}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
      />
    </SurveyControl>
  </Pane>
};
