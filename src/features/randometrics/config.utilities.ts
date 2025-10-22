import { Temporal } from "@js-temporal/polyfill";
import { getSeasonalFacetometric } from "./utilities";
import { RandometricConfigValidationProps } from "./types";

const now = Temporal.Now.zonedDateTimeISO();
const {
  grow,
  horizontal,
  label,
  size,
} = getSeasonalFacetometric({ ...now, month: now.month + 1 });
export const SEASONAL_FACETOMETRIC: RandometricConfigValidationProps = {
  configs: [
    {
      horizontal,
      grow,
      size,
    },
  ],
  label,
  priority: 0,
};
