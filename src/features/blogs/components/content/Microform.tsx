import { useMemo, useState } from "react";
import { Microform } from "../../../../libs/sanity";
import { MicroformNo } from "../../../surveys/microforms/components/MicroformNo";

type MicroformProps = Pick<Microform, 'completionText' | 'label'> & {
  onDone: () => void;
};


const ComponentMap: {
  [K in Microform['formType']]: React.ComponentType<MicroformProps>;
} = {
  no: MicroformNo,
};

export const BlogRendererMicroform = ({ value }: { value: Microform; }) => {
  const { formType, ...args } = value;
  const Component = useMemo(() => ComponentMap[formType], [formType]);
  const [isDone, setIsDone] = useState(false);
  const handleDone = () => {
    setIsDone(true);
  };

  if (isDone) return <div>{value.completionText}</div>;

  if (!Component) {
    console.error(`Missing component for Microform Type: ${formType}`);
    return <div>[Error: Could not render microform. Check console for details.]</div>;
  }

  return <div>
    <Component {...args} onDone={handleDone} />
  </div>;
};
