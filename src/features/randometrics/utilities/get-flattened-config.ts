import { PrimaryLabelChipProps } from "../../../common/components/PrimaryLabelChip";
import { Randometric, RandometricConfig, RandometricConfigKey } from "../config";

type RandometricCore = Pick<Randometric, 'name' | 'priority'>;
type ChipMetric = RandometricCore & { props: PrimaryLabelChipProps };

const getDefaultProps = (props: PrimaryLabelChipProps) => ({
  horizontal: false,
  ...props,
  size: {
    height: 1,
    width: 1,
    ...('size' in props && props.size),
  },
});
const getDefaultRandometric = (metric: Pick<Randometric, 'name' | 'priority'> & { props: PrimaryLabelChipProps }): Randometric => ({
  ...metric,
  props: getDefaultProps(metric.props),
});

const getActualMetrics = (
  seasonalChip: PrimaryLabelChipProps,
  mvpChip: PrimaryLabelChipProps
): Randometric[] => {
  const metrics: ChipMetric[] = [
    {
      name: 'seasonal',
      props: seasonalChip,
      priority: 1,
    },
    {
      name: 'dev',
      props: mvpChip,
      priority: 1,
    }
  ];
  return metrics.map(getDefaultRandometric);
};

export const getFlattenedRandometricConfig = (
  randometricConfig: RandometricConfig,
  seasonalChip: PrimaryLabelChipProps,
  mvpChip: PrimaryLabelChipProps,
) => {
  const actualmetrics = getActualMetrics(seasonalChip, mvpChip);
  return Object
    .entries(randometricConfig)
    .reduce((
      randometrics,
      [
        name,
        {
          configs,
          label,
          ...metric
        },
      ]
    ) => {
      const priority = ('priority' in metric) ? metric.priority || 0 : 0;
      const value = ('value' in metric) ? metric.value : '';
      console.log('flatten', label, configs)
      return [
        ...randometrics,
        ...configs.map((props) => ({
          props: {
            horizontal: false,
            ...props,
            size: {
              height: 1,
              width: 1,
              ...('size' in props && props.size),
            },
            label,
          },
          name: name as RandometricConfigKey,
          priority,
          value,
        })),
      ];
    },
    actualmetrics
  ).sort((a, b) => b.priority - a.priority);
};

