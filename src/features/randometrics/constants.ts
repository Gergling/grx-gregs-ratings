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
};

export const SEASONAL_FACETOMETRIC_NAMES: {
  season: string;
  width: number;
}[] = [
  { season: 'Burns Night', width: 4, },
  { season: 'Valentine\'s Day', width: 5, },
  { season: 'St Patrick\'s Day', width: 5, },
  { season: 'Easter', width: 4, },
  { season: 'Long Weekend', width: 5, },
  { season: 'Father\'s Day', width: 4, },
  { season: 'Seeing the sun for the first time in about 9 months', width: 8, },
  { season: 'Planning for Christmas in ad campaigns', width: 7, },
  { season: 'Back to school', width: 5, },
  { season: 'Halloween', width: 4, },
  { season: 'Bonfire Night', width: 4, },
  { season: 'Christmas', width: 4, },
];
