import { PrimaryLabelChip } from "../../elastic-response/components/PrimaryLabelChip";
import { MetricPopProps } from "../config";
import { useRandometric } from "../hooks";

export const Randometric = (props: MetricPopProps) => {
  const metric = useRandometric(props);

  return (
    <PrimaryLabelChip
      {...metric}
      {...metric.props}
      value={metric.value}
    />
  );
}
