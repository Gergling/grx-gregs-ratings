import { Temporal } from "@js-temporal/polyfill";
import { useEffect, useMemo, useState } from "react";
import { getRelativeTimeString } from "../utilities/get-relative-time-string";

const getRelative = (earlier: Temporal.ZonedDateTime) => {
  const now = Temporal.Now.zonedDateTimeISO();
  const duration = now.since(earlier, { largestUnit: 'years' });
  return getRelativeTimeString(duration);
};

export const useRelativeTimeString = (
  targetDateTime: Temporal.ZonedDateTime
) => {
  const initialRelativeTime = useMemo(() => getRelative(targetDateTime), [targetDateTime]);
  const [relativeTime, setRelativeTime] = useState<string>(initialRelativeTime);

  useEffect(() => {
    // Set interval to update every 60 seconds (60000ms)
    const intervalId = setInterval(() => {
      setRelativeTime(getRelative(targetDateTime));
    }, 1000); 

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [targetDateTime]); // Re-run if the target time changes

  return relativeTime;
};
