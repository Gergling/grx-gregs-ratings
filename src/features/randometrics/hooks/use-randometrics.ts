import { useCallback, useEffect } from "react";
import { useRandometricDevelopmentProgress } from "./use-development-progress";
import { useBlogProgress } from "../../blogs";
import { useRandometricsContext } from "../context";
import { MetricPopProps, Randometric } from "../config";
import { useElasticResponse } from "../../elastic-response";
import { getRandometricPlaceholder } from "../utilities/get-placeholder";
import { getMetricConfig } from "../utilities";

export const useRandometrics = () => {
  const {
    randometrics,
    selected,
    values,
    setBlogProgress,
    setDevProgress,
    setSizeMetric,
    setSelected,
  } = useRandometricsContext();
  const progress = useBlogProgress();
  const dev = useRandometricDevelopmentProgress();
  const { size } = useElasticResponse();
  // TODO: Calculate the UPM value here. useEffect it back into the store, probably.

  const getMetric = useCallback(
    (props: MetricPopProps): Randometric => {
      const metric = getMetricConfig(props, randometrics, selected);
      if (metric) {
        // setSelected(metric.name);
        return metric;
      }

      return getRandometricPlaceholder(props);
    },
    [randometrics, selected]
  );

  useEffect(() => {
    setDevProgress(dev);
  }, [dev, setDevProgress]);
  useEffect(() => {
    setBlogProgress(progress);
  }, [progress, setBlogProgress]);
  useEffect(() => {
    setSizeMetric(size);
  }, [size, setSizeMetric]);

  return {
    randometrics,
    values,
    getMetric,
    setSelected,
  };
};
