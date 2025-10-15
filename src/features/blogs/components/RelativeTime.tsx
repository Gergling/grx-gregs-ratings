import { Temporal } from "@js-temporal/polyfill";
import { useRelativeTimeString } from "../../../common/hooks/use-relative-time-string";

export const RelativeTime = ({
  publishedAt
}: {
  publishedAt: Temporal.ZonedDateTime;
}) => {
  const relativeTime = useRelativeTimeString(publishedAt)

  return <>{relativeTime}</>;
};
