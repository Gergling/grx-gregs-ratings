import { useCallback, useEffect } from "react";
import { useRandometricDevelopmentProgress } from "./use-development-progress";
import { useBlogProgress } from "../../blogs";
import { useRandometricsContext } from "../context";
import { MetricPopProps } from "../config";
import { PrimaryLabelChipProps } from "../../elastic-response/types";
import { getEffectiveSizeOffset } from "../utilities/get-effective-size-offset";
import { useElasticResponse } from "../../elastic-response";

export const useRandometrics = () => {
  const {
    pop,
    setBlogProgress,
    setDevProgress,
    setSizeMetric,
  } = useRandometricsContext();
  const progress = useBlogProgress();
  const dev = useRandometricDevelopmentProgress();
  const { size } = useElasticResponse();

  const popMetric = useCallback(
    (props: MetricPopProps): PrimaryLabelChipProps => {
      const metric = pop(props);
      const { height: requestedHeight, width: requestedWidth } = props;
      if (!metric) {
        const horizontal = requestedHeight === 1;
        const offset = getEffectiveSizeOffset(horizontal);
        const height = requestedHeight === undefined ? 1 : requestedHeight - offset.height;
        const width = requestedWidth === undefined ? 1 : requestedWidth - offset.width;
        return {
          label: 'Crows',
          grow: { value: 0 },
          horizontal,
          size: {
            height,
            width,
          },
          value: '3',
        };
      }

      return {
        ...metric.props,
        value: metric.value,
      };
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
    popMetric,
  };
};
