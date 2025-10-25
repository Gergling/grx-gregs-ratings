import { contextFactory } from "@gergling/ui-components";
import { PropsWithChildren, ReactNode } from "react";
import { create } from "zustand";
import {
  RANDOMETRIC_CONFIG,
  Randometric,
  RandometricConfigKey,
  RandometricSelection
} from "./config";
import { getFlattenedRandometricConfig } from "./utilities/get-flattened-config";
import { PrimaryLabelChipProps } from "../elastic-response/types";
import { BlogProgressReport } from "../blogs";
import { reduceRandometricValues } from "./utilities/reduce-values";

type Values = {
  [K in RandometricConfigKey]: ReactNode;
};

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
const blogMetricKeys = Object.keys(blogMetricConfig) as RandometricConfigKey[];

const getRandometricNames = (randometrics: Randometric[]) => randometrics.map(({ name }) => name);

const staticRandometrics = getFlattenedRandometricConfig(RANDOMETRIC_CONFIG);
const staticRemaining = getRandometricNames(staticRandometrics);

const metricStore = create<{
  randometrics: Randometric[];
  remaining: RandometricConfigKey[];
  selected: RandometricSelection;
  values: Values;
  setBlogProgress: (blogProgress: BlogProgressReport) => void;
  setDevProgress: (devChip: PrimaryLabelChipProps) => void;
  setSizeMetric: (size: number) => void;
  setSelected: (name: RandometricConfigKey) => void;
}>((set, get) => {
  const {
    selected,
    values
  } = staticRandometrics.reduce(({
    selected,
    values
  }, metric) => ({
    values: {
      ...values,
      [metric.name]: metric.value,
    },
    selected: {
      ...selected,
      [metric.name]: false,
    },
  }), {
    values: {} as Values,
    selected: {} as RandometricSelection,
  });

  return {
    randometrics: staticRandometrics,
    remaining: staticRemaining,
    selected,
    values,
    setBlogProgress: (blogProgressReport) => {
      const values = reduceRandometricValues(get().values, (previous, key) => {
        if (!(blogMetricKeys.includes(key))) return previous;

        return blogMetricConfig[key as BlogMetricKey](blogProgressReport);
      });

      set({ values });
    },
    setDevProgress: (devChip) => {
      const values = reduceRandometricValues(get().values, (previous, key) => {
        if (key !== 'dev') return previous;

        return devChip.value;
      });

      set({ values });
    },
    setSizeMetric: (value) => {
      const values = reduceRandometricValues(get().values, (previous, key) => {
        if (key !== 'sos') return previous;

        return value;
      });

      set({ values });
    },
    setSelected: (metricName) => set((state) => ({
      selected: {
        ...state.selected,
        [metricName]: true,
      },
    })),
  };
});

export const {
  Provider: RandometricsProvider,
  useContextHook: useRandometricsContext,
} = contextFactory((_: PropsWithChildren) => metricStore(), 'randometrics');
