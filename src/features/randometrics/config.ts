import { PrimaryLabelChipProps } from "../../common/components/PrimaryLabelChip";
import { SEASONAL_FACETOMETRIC } from "./config.utilities";
import { FACETOMETRICS } from "./constants";
import { RandometricConfigValidation } from "./types";

const blogProgress = {
  blogIdeas: {
    priority: 1,
    label: 'Blog Ideas',
    configs: [
      {
        horizontal: true,
        grow: { value: 0 },
      },
    ],
  },
  blogPublishProjected: {
    priority: 1,
    label: 'Next Projected Publishing Date',
    configs: [
      {
        grow: { value: 0 },
        size: { height: 4 },
      },
    ],
  },
  blogPublishedLast: {
    priority: 1,
    label: 'Last Blog Published',
    configs: [
      {
        size: { width: 2 },
      }
    ],
  },
  blogUpcoming: {
    priority: 1,
    label: 'Upcoming Blog Title',
    configs: [
      {
        size: { width: 5 },
      }
    ]
  },
};

export const RANDOMETRIC_CONFIG = {
  ...blogProgress,
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
