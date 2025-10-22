import { Temporal } from "@js-temporal/polyfill";
import { SEASONAL_FACETOMETRIC_NAMES } from "../constants";
import { PrimaryLabelChipProps } from "../../../common/components/PrimaryLabelChip";

export const getSeasonalFacetometric = (
  { month, year }: Pick<Temporal.ZonedDateTime, 'month' | 'year'>,
): PrimaryLabelChipProps => {
  const {
    season,
    width,
  } = SEASONAL_FACETOMETRIC_NAMES[month - 1];
  const label = `${season} themes planned (STP)`;
  const value = `0/${year}`;
  return {
    grow: { value: 0 },
    horizontal: true,
    size: {
      width,
    },
    label,
    value,
  };
};
