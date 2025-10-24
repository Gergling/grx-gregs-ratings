import { useCallback, useEffect } from "react";
import { useRandometricDevelopmentProgress } from "./use-development-progress";
import { useBlogProgress } from "../../blogs";
import { useRandometricsContext } from "../context";
import { MetricPopProps, Randometric } from "../config";
import { useElasticResponse } from "../../elastic-response";
import { getRandometricPlaceholder } from "../utilities/get-placeholder";

export const useRandometrics = () => {
  const {
    randometrics,
    values,
    pop,
    setBlogProgress,
    setDevProgress,
    setSizeMetric,
  } = useRandometricsContext();
  const progress = useBlogProgress();
  const dev = useRandometricDevelopmentProgress();
  const { size } = useElasticResponse();

  const popMetric = useCallback(
    (props: MetricPopProps): Randometric => {
      const metric = pop(props);

      if (metric) return metric;

      return getRandometricPlaceholder(props);
    },
    [pop]
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
    popMetric,
  };
};
