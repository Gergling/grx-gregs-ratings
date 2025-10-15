import { PortableText } from "@portabletext/react";
import { useBlogItemQuery } from "../hooks";
import { BlockContent } from "../../../libs/sanity";
import { ReadablePublishingTime } from "./ReadablePublishingTime";
import { Typography } from "@mui/material";

type SingleBlogProps = { slug: string; };

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
