import { Temporal } from "@js-temporal/polyfill";
import { MetricChipProps } from "../types";
import { SEASONAL_FACETOMETRIC_NAMES } from "../constants";

export const getSeasonalFacetometric = (
  { month, year }: Temporal.ZonedDateTime
): MetricChipProps => {
  const label = `${SEASONAL_FACETOMETRIC_NAMES[month - 1]} themes planned (STP)`;
  const value = `0/${year}`;
  return {
    color: 'primary',
    label,
    value,
  };
};
