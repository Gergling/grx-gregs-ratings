import { Temporal } from "@js-temporal/polyfill";
import { useMemo } from "react";
import { RelativeTime } from "./RelativeTime";

export const ReadablePublishingTime = ({
  publishedAt
}: {
  publishedAt: string | null;
}) => {
  const zonedDT = useMemo(
    () => {
      if (!publishedAt) return undefined;

      const instant = Temporal.Instant.from(publishedAt);
      return instant.toZonedDateTimeISO(Temporal.Now.timeZoneId());
    },
    [publishedAt]
  );
  const readablePublishedAt = useMemo(
    () => {
      if (!zonedDT) return '';

      const {
        year,
        month,
        day,
        hour,
        minute,
      } = zonedDT;

      return `${hour}:${minute} ${year}-${month}-${day}`;
    },
    [zonedDT]
  );

  if (!zonedDT) return undefined;

  return <>
    <RelativeTime publishedAt={zonedDT} />
    @
    {readablePublishedAt}
  </>;
};
