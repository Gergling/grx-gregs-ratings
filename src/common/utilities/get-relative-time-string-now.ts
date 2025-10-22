import { Temporal } from "@js-temporal/polyfill";
import { getRelativeTimeString } from "./get-relative-time-string";

export const getRelativeTimeStringNow = (earlier: Temporal.ZonedDateTime) => {
  const now = Temporal.Now.zonedDateTimeISO();
  const duration = now.since(earlier, { largestUnit: 'years' });
  return getRelativeTimeString(duration);
};
