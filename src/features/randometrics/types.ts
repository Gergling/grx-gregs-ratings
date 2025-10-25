import { MetricChip } from "@gergling/ui-components";
import { PrimaryLabelChipProps } from "../elastic-response/types";

export type MetricChipProps = Parameters<typeof MetricChip>[0];

export type RandometricConfigValidationProps = {
  configs: Pick<PrimaryLabelChipProps, 'grow' | 'horizontal' | 'size' | 'textMaskFaded'>[];
  label: PrimaryLabelChipProps['label'];
  priority?: number;
  value?: PrimaryLabelChipProps['value'];
};

export type RandometricConfigTemplate = {
  [K: string]: RandometricConfigValidationProps;
};

export type RandometricConfigValidation<T extends RandometricConfigTemplate> = T;
