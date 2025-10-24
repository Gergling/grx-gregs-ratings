import { useMemo } from "react";
import { Temporal } from "@js-temporal/polyfill";
import { useQuery } from "@tanstack/react-query";
import { fetchArticleProgressStatus } from "../queries";
import { TWELVE_HOURS_IN_MS } from "../../../common/constants";
import { useBlogNavigate } from "./use-navigate";
import { getRelativeTimeStringNow } from "../../../common/utilities/get-relative-time-string-now";
import { BlogProgressReport, UpcomingBlog } from "../types";

const reduceDates = (
  dates: Temporal.ZonedDateTime[],
  date: string | null,
) => {
  if (!date) return dates;

  const instant = Temporal.Instant.from(date);

  return [
    ...dates,
    instant.toZonedDateTimeISO(Temporal.Now.timeZoneId()),
  ];
}

export const useBlogProgress = (): BlogProgressReport & {
  isError: boolean;
  isLoading: boolean;
} => {
  const navigate = useBlogNavigate();

  const {
    data,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['blog-progress'],
    queryFn: fetchArticleProgressStatus,
    staleTime: TWELVE_HOURS_IN_MS,
  });

  // TODO: Could do with a list of published dates.
  // Could also use the prescence of images and body content to score progress somehow.
  const {
    ideas,
    lastPublished,
    nextProjectedPublishDate,
    upcoming,
  } = useMemo(() => {
    const ideas = data?.ideaCount.toString() ?? 'wat';
    const [upcoming] = (data?.upcomingList || []).map((item): UpcomingBlog => ({
      ...item,
      onClick: () => navigate(item.slug),
    }));
    const published = (data?.publishDates || []).reduce(reduceDates, []);
    const lastPublished = published.length > 0 ? getRelativeTimeStringNow(published[0]) : 'Never';
    const nextProjectedPublishDate = 'Eventually';
    return {
      ideas,
      lastPublished,
      nextProjectedPublishDate,
      upcoming,
    };
  }, [data]);

  return useMemo(() => ({
    ideas,
    isError,
    isLoading,
    lastPublished,
    nextProjectedPublishDate,
    upcoming,
  }), [ideas, isError, isLoading, lastPublished, nextProjectedPublishDate, upcoming]);
};
