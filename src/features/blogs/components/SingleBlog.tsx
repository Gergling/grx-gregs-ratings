import { PortableText } from "@portabletext/react";
import { Temporal } from '@js-temporal/polyfill';
import { useBlogItemQuery } from "../hooks";
import { BlockContent } from "../../../libs/sanity";
import { useMemo } from "react";
import { useRelativeTimeString } from "../../../common/hooks/use-relative-time-string";

type SingleBlogProps = { slug: string; };

const RelativeTime = ({
  publishedAt
}: {
  publishedAt: Temporal.ZonedDateTime;
}) => {
  const relativeTime = useRelativeTimeString(publishedAt)

  return <>{relativeTime}</>;
};

const ReadablePublishingTime = ({
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

const RenderBlog = ({
  title,
  image,
  // categories,
  publishedAt,
  body,
}: {
  title: string;
  slug: string;
  image: string | null;
  categories: {
      description: string | null;
      title: string | null;
  }[] | null;
  publishedAt: string | null;
  body: BlockContent;
}) => {

  return (
    <>
      {title}
      <span> </span>
      <ReadablePublishingTime publishedAt={publishedAt} />
      ({publishedAt})
      {image && <img src={image} alt={title} />}
      <PortableText value={body} />
    </>
  );
};

export const SingleBlog = ({ slug }: SingleBlogProps) => {
  const {
    data,
    isLoading,
    error
  } = useBlogItemQuery(slug);

  if (isLoading) return <>Loading...</>;
  if (error) return <>Error: {error.message}</>;
  if (!data) return <>No article found.</>;
  if (!data.body) return <>Article has no body.</>;

  return <RenderBlog {...data} body={data.body} />;
};
