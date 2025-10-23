import { useMemo } from "react";
import { useRandometrics } from "../hooks/use-randometrics";
import { PrimaryLabelChip } from "../../elastic-response/components/PrimaryLabelChip";
import { MetricPopProps } from "../config";

export const Randometric = (props: MetricPopProps) => {
  const { popMetric } = useRandometrics();
  const metric = useMemo(
    () => popMetric(props),
    [popMetric, props]
  );

  return (
    <PrimaryLabelChip
      {...metric}
    />
  );
}
