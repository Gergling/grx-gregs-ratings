import { useMemo } from "react";
import { MetricPopProps, Randometric } from "../config";
import { useRandometrics } from "./use-randometrics";

export const useRandometric = (props: MetricPopProps): Randometric => {
  const { popMetric, values } = useRandometrics();

  const metric = useMemo(
    () => popMetric(props),
    [popMetric, props]
  );
  const value = useMemo(
    () => {
      if (!metric) return;
      if (!(metric.name in values)) return;

      return values[metric.name];
    },
    [metric.name, values]
  );

  return useMemo(() => ({
    ...metric,
    value
  }), [metric, value]);
};
