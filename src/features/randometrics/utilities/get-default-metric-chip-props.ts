import { MetricChipProps } from "../types";

type DefaultMetricChipProps
  = Pick<Partial<MetricChipProps>, 'color'>
  & Omit<MetricChipProps, 'color'>;

export const getDefaultMetricChipProps = (
  props: DefaultMetricChipProps
): MetricChipProps => ({
  color: 'primary',
  ...props
});
