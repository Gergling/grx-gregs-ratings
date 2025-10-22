import { PrimaryLabelChipProps } from "../../elastic-response/types";
import { RandometricConfigValidation } from "../types";
import { BLOG_PROGRESS_METRICS } from "./blog-progress";
import { FACETOMETRICS } from "./facetometrics";
import { SEASONAL_FACETOMETRIC } from "./seasonal-facetometrics";

export const RANDOMETRIC_CONFIG = {
  ...BLOG_PROGRESS_METRICS,
  seasonal: SEASONAL_FACETOMETRIC,
  ...FACETOMETRICS,
  dev: {
    priority: 1,
    label: 'Development',
    configs: [
      {
        size: {
          width: 2,
          height: 1,
        },
      },
    ],
  },
};

export type RandometricConfig = RandometricConfigValidation<typeof RANDOMETRIC_CONFIG>;
export type RandometricConfigKey = keyof RandometricConfig;

type RequireKey<
  T extends {},
  U extends keyof T
> = Omit<T, U>
  & Required<Pick<T, U>>;
type ReplaceKey<
  T extends {},
  U extends keyof T,
  V
> = Omit<T, U>
  & { [K in U]: V };
type Props = Omit<PrimaryLabelChipProps, 'value'>;
type PartiallyRequired = RequireKey<Props, 'horizontal' | 'size'>;
export type Randometric = {
  name: RandometricConfigKey;
  priority: number;
  props: ReplaceKey<PartiallyRequired, 'size', Required<PartiallyRequired['size']>>;
  value?: PrimaryLabelChipProps['value'];
};

export const RANDOMETRIC_CONFIG_KEYS = Object.keys(RANDOMETRIC_CONFIG) as RandometricConfigKey[];

export type MetricPopProps = {
  height: number;
  width: number;
  name?: RandometricConfigKey;
} | {
  height?: number;
  width?: number;
  name: RandometricConfigKey;
};

export type RandometricValues = {
  [K in RandometricConfigKey]: PrimaryLabelChipProps['value'];
};
