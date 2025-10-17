import { MetricChipProps } from "./types";
import { getDefaultMetricChipProps } from "./utilities/get-default-metric-chip-props";

export const FACETOMETRICS: MetricChipProps[] = [
  {
    label: 'Entropy Over Time (EOT)',
    value: 'Inferior',
  },
  {
    label: 'Blog Rating (BRX)',
    value: 'None of your business',
  },
  {
    label: 'People Per Capita (PPC)',
    value: '100%',
  },
  {
    label: 'Current Value Of Pi (Pi)',
    value: `${Math.PI.toString()}...`,
  },
].map(getDefaultMetricChipProps);

export const SEASONAL_FACETOMETRIC_NAMES = [
  'Burns Night',
  'Valentine\'s Day',
  'St Patrick\'s Day',
  'Easter',
  'Long Weekend',
  'Father\'s Day',
  'Seeing the sun for the first time in about 9 months',
  'Planning for Christmas in ad campaigns',
  'Back to school',
  'Halloween',
  'Bonfire Night',
  'Christmas',
];
