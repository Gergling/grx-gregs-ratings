import { useCallback, useEffect } from "react";
import { useRandometricDevelopmentProgress } from "./use-development-progress";
import { useBlogProgress } from "../../blogs";
import { useRandometricsContext } from "../context";
import { MetricPopProps } from "../config";
import { PrimaryLabelChipProps } from "../../elastic-response/types";

export const useRandometrics = () => {
  const {
    pop,
    setBlogProgress,
    setDevProgress,
  } = useRandometricsContext();
  const progress = useBlogProgress();
  const dev = useRandometricDevelopmentProgress();

  const popMetric = useCallback(
    (props: MetricPopProps): PrimaryLabelChipProps => {
      const metric = pop(props);
      const { height, width } = props;
      if (!metric) 
        return {
        label: 'Crows',
        size: {
          height,
          width,
        },
        value: '3',
      };

      return {
        ...metric.props,
        value: metric.value,
      };
    },
    [pop]
  );

  useEffect(() => {
    setDevProgress(dev);
  }, [dev]);
  useEffect(() => {
    setBlogProgress(progress);
  }, [progress]);

  return {
    popMetric,
  };
};
