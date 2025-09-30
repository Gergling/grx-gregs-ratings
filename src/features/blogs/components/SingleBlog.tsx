import { PortableText } from "@portabletext/react";
import { useBlogItemQuery } from "../hooks";

type SingleBlogProps = { slug: string; };

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

  return <PortableText value={data.body} />;
};
