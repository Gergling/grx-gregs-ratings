import { contextFactory } from "@gergling/ui-components";
import { PropsWithChildren } from "react";
import { create } from "zustand";
import { MetricPopProps, RANDOMETRIC_CONFIG, Randometric, RandometricConfigKey } from "./config";
import { getMetricConfig } from "./utilities/get-metric-config";
import { getFlattenedRandometricConfig } from "./utilities/get-flattened-config";
import { PrimaryLabelChipProps } from "../../common/components/PrimaryLabelChip";

const getRandometricNames = (randometrics: Randometric[]) => randometrics.map(({ name }) => name);

const metricStore = create<{
  randometrics: Randometric[];
  remaining: RandometricConfigKey[];
  initialize: (seasonalChip: PrimaryLabelChipProps, mvpChip: PrimaryLabelChipProps) => void;
  pop: (props: MetricPopProps) => Randometric | undefined;
  reset: () => void;
}>((set, get) => {
  const reset = () => {
    const { randometrics } = get();
    set({ remaining: getRandometricNames(randometrics) });
  };
  return {
    randometrics: [],
    remaining: [],
    initialize: (seasonalChip, mvpChip) => {
      const randometrics = getFlattenedRandometricConfig(
        RANDOMETRIC_CONFIG,
        seasonalChip,
        mvpChip
      );
      const remaining = getRandometricNames(randometrics);
      set({ randometrics, remaining });
    },
    pop: (props) => {
      const { randometrics } = get();
      const metric = getMetricConfig(props, randometrics);
      if (metric) {
        set((state) => ({
          remaining: state.remaining.filter((name) => name !== metric.name),
        }));
      }
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
