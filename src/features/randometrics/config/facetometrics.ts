export const FACETOMETRICS = {
  eot: {
    configs: [
      {
        size: { width: 2 },
      },
    ],
    label: 'Entropy Over Time (EOT)',
    value: 'Inferior',
  },
  brx: {
    configs: [
      {
        size: { width: 3 },
      },
    ],
    label: 'Blog Rating (BRX)',
    value: 'None of your business',
  },
  ppc: {
    configs: [
      {
        size: { width: 2 },
      },
      {
        grow: { value: 0 },
        horizontal: true,
        size: { width: 3 },
      },
    ],
    label: 'People Per Capita (PPC)',
    value: '100%',
  },
  pi: {
    configs: [
      {
        size: { width: 3 },
      },
    ],
    label: 'Current Value Of Pi (Pi)',
    value: `${Math.PI.toString()}...`,
  },
  wsv: {
    configs: [
      {
        size: { width: 1, height: 2 },
      },
    ],
    label: 'Words Stacked Erect (WSE)',
    value: '3',
  }
};
