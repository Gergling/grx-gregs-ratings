import { contextFactory } from "@gergling/ui-components";
import { PropsWithChildren } from "react";
import { create } from "zustand";
import { MetricPopProps, RANDOMETRIC_CONFIG, Randometric, RandometricConfigKey } from "./config";
import { getMetricConfig } from "./utilities/get-metric-config";
import { getFlattenedRandometricConfig } from "./utilities/get-flattened-config";
import { PrimaryLabelChipProps } from "../elastic-response/types";
import { BlogProgressReport } from "../blogs";

type ValueFn = (report: BlogProgressReport) => string;
const defineMetricConfig = <T extends Partial<Record<RandometricConfigKey, ValueFn>>>(
  config: T
) => config;
const blogMetricConfig = defineMetricConfig({
  blogIdeas: (report) => report.ideas,
  blogPublishProjected: (report) => report.nextProjectedPublishDate,
  blogPublishedLast: (report) => report.lastPublished,
  blogUpcoming: (report) => report.upcoming?.title,
});

type BlogMetricKey = keyof typeof blogMetricConfig;

const getRandometricNames = (randometrics: Randometric[]) => randometrics.map(({ name }) => name);

const staticRandometrics = getFlattenedRandometricConfig(RANDOMETRIC_CONFIG);
const staticRemaining = getRandometricNames(staticRandometrics);

const metricStore = create<{
  randometrics: Randometric[];
  remaining: RandometricConfigKey[];
  setBlogProgress: (blogProgress: BlogProgressReport) => void;
  setDevProgress: (devChip: PrimaryLabelChipProps) => void;
  setSizeMetric: (size: number) => void;
  pop: (props: MetricPopProps) => Randometric | undefined;
  reset: () => void;
}>((set, get) => {
  const reset = () => {
    const { randometrics } = get();
    set({ remaining: getRandometricNames(randometrics) });
  };
  return {
    randometrics: staticRandometrics,
    remaining: staticRemaining,
    setBlogProgress: (blogProgressReport) => {
      set((state) => ({
        randometrics: state.randometrics.map((metric) => {
          if (metric.name in blogMetricConfig) {
            const value = blogMetricConfig[metric.name as BlogMetricKey](blogProgressReport)
            if (value !== metric.value && value !== '') return { ...metric, value };
          }
          return metric;
        }),
      }));
    },
    setDevProgress: (devChip) => {
      set((state) => ({
        randometrics: state.randometrics.map((metric) => {
          if (metric.name === 'dev') return { ...metric, value: devChip.value };
          return metric;
        }),
      }));
    },
    setSizeMetric: (value) => {
      set((state) => ({
        randometrics: state.randometrics.map((metric) => {
          if (metric.name === 'sos') return { ...metric, value };
          return metric;
        }),
      }));
    },
    pop: (props) => {
      const { randometrics } = get();
      const metric = getMetricConfig(props, randometrics);
      // console.log('pop', props, metric)
      // TODO: Need to update UPM while updating this.
      // Consider updating the status of each one of these to being "in use" somehow.
      // if (metric) {
      //   set((state) => ({
      //     remaining: state.remaining.filter((name) => name !== metric.name),
      //   }));
      // }
      // TODO: Probably best to mark the metric as in use.
      return metric;
    },
    reset,
  };
});

export const {
  Provider: RandometricsProvider,
  useContextHook: useRandometricsContext,
} = contextFactory((_: PropsWithChildren) => metricStore(), 'randometrics');
