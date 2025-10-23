import { Temporal } from "@js-temporal/polyfill";
import { RandometricConfigValidationProps } from "../types";
import { PrimaryLabelChipProps } from "../../elastic-response/types";

const SEASONAL_FACETOMETRIC_NAMES: {
  season: React.ReactNode;
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

const getSeasonalFacetometric = (
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

const now = Temporal.Now.zonedDateTimeISO();
const {
  grow,
  horizontal,
  label,
  size,
} = getSeasonalFacetometric({ ...now, month: now.month });
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
