import { PrimaryLabelChipProps } from "../../elastic-response/types";
import { MetricPopProps, Randometric, RandometricConfigKey } from "../config";
import { getEffectiveSizeOffset } from "./get-effective-size-offset";

export const getRandometricPlaceholder = (
  props: MetricPopProps,
  label: PrimaryLabelChipProps['label'] = 'Crows',
  value: PrimaryLabelChipProps['value'] = '3',
  grow: PrimaryLabelChipProps['grow'] = { value: 0 },
): Randometric => {
  const { height: requestedHeight, width: requestedWidth } = props;
  const horizontal = requestedHeight === 1;
  const offset = getEffectiveSizeOffset(horizontal);
  const height = requestedHeight === undefined ? 1 : requestedHeight - offset.height;
  const width = requestedWidth === undefined ? 1 : requestedWidth - offset.width;
  return {
    name: '' as RandometricConfigKey,
    priority: 0,
    props: {
      label,
      grow,
      horizontal,
      size: {
        height,
        width,
      },
    },
    value,
  };
};
