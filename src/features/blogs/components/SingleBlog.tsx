import { useMemo } from "react";
import { PortableText } from "@portabletext/react";
import { toHTML } from '@portabletext/to-html'
import { Typography } from "@mui/material";
import { Seo } from "../../../common/components/Seo";
import { BlockContent } from "../../../libs/sanity";
import { useBlogItemQuery } from "../hooks";
import { ReadablePublishingTime } from "./ReadablePublishingTime";

type SingleBlogProps = { slug: string; };

const RenderBlog = ({
  title,
  image,
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
  const blogDescription = useMemo(() => {
    const html = toHTML(body);
    const text = html.replace(/<\/?[^>]+(>|$)/g, "").trim();
    if (text.length < 150) return text;

    const truncatedByLength = text.substring(0, 150);
    const lastSpace = truncatedByLength.lastIndexOf(' ');
    const truncatedByWord = lastSpace !== -1 ? truncatedByLength.substring(0, lastSpace) : truncatedByLength;
    const ellipsisText = `${truncatedByWord}...`;
    return ellipsisText;
  }, [body]);

  return (
    <>
      <Seo
        title={title}
        description={blogDescription}
        image={image ?? ''}
      />
      <Typography variant="h4" sx={{ textAlign: 'center' }}>{title}</Typography>
      <div style={{ textAlign: 'center' }}>
        {image && <img src={image} alt={title} height="200" />}
      </div>
      <ReadablePublishingTime publishedAt={publishedAt} />
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
