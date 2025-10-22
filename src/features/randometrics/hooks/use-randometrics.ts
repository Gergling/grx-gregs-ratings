import { useCallback, useEffect, useMemo } from "react";
import { Temporal } from "@js-temporal/polyfill";
import { getSeasonalFacetometric } from "../utilities";
import { useRandometricDevelopmentProgress } from "./use-development-progress";
import { useBlogProgress } from "../../blogs";
import { PrimaryLabelChipProps } from "../../../common/components/PrimaryLabelChip";
import { useRandometricsContext } from "../context";
import { MetricPopProps, RandometricValues } from "../config";

const now = Temporal.Now.zonedDateTimeISO();

export const useRandometrics = () => {
  const {
    initialize,
    randometrics,
    pop,
  } = useRandometricsContext();
  // const windowWidth = useWindowWidthRem();
  // const windowWidthRemFloor = useMemo(() => Math.floor(getSize(windowWidth, 0).columns), [windowWidth]);
  // console.log(windowWidth,windowWidthRemFloor)
  // const now = useMemo(() => Temporal.Now.zonedDateTimeISO(), []);
  const seasonal = useMemo(() => getSeasonalFacetometric(now), []);
  // const allSeasonal = useMemo(
  //   () => Array
  //     .from({ length: 12 })
  //     .map((_, month) => getSeasonalFacetometric({ year: now.year, month: month + 1 })),
  //   [now]
  // );
  const progress = useBlogProgress();
  const mvp = useRandometricDevelopmentProgress();

  const configValues = useMemo(() => randometrics.reduce(
    (configValues, { name, value }) => ({
      ...configValues,
      [name]: value,
    }),
    {} as RandometricValues,
  ), [randometrics]);
  const values = useMemo((): RandometricValues => ({
    ...configValues,
    blogIdeas: progress.ideas,
    blogPublishProjected: progress.nextProjectedPublishDate,
    blogPublishedLast: progress.lastPublished,
    blogUpcoming: progress.upcoming?.title,
    dev: mvp.value,
    seasonal: seasonal.value,
  }), [configValues, progress.ideas, progress.nextProjectedPublishDate, progress.lastPublished, progress.upcoming?.title, mvp.value, seasonal.value]);
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
        value: 'Some',
      };

      const value = values[metric.name];

      return {
        ...metric.props,
        value,
      };
    },
    [pop, values]
  );
  const metrics = useMemo(() => {
    return [
      // ...FACETOMETRICS,
      mvp,
      seasonal,
    ];
  }, [mvp, seasonal]);

  // Initialize the store once when the dynamic data is ready.
  // This replaces the problematic synchronization effect.
  useEffect(() => {
    // We could add a loading check here if mvp has one
    initialize(seasonal, mvp);
  }, [initialize, seasonal, mvp]);

  return {
    // allSeasonal,
    metrics,
    popMetric,
  };
};
