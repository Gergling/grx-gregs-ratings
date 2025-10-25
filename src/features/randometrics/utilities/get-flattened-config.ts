import { Randometric, RandometricConfig, RandometricConfigKey } from "../config";

export const getFlattenedRandometricConfig = (
  randometricConfig: RandometricConfig,
) => Object
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
  [] as Randometric[],
).sort((a, b) => b.priority - a.priority);
