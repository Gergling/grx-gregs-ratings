import { useEffect, useMemo } from "react";
import { MetricPopProps, Randometric } from "../config";
import { useRandometrics } from "./use-randometrics";

export const useRandometric = (props: MetricPopProps): Randometric => {
  const { getMetric, setSelected, values } = useRandometrics();

  const metric = useMemo(
    () => getMetric(props),
    [getMetric, props]
  );
  const value = useMemo(
    () => {
      if (!metric) return;
      if (!(metric.name in values)) return;

      return values[metric.name];
    },
    [metric.name, values]
  );

  useEffect(() => {
    // setSelected(metric.name);
  }, [metric.name, setSelected])

  return useMemo(() => ({
    ...metric,
    value
  }), [metric, value]);
};
