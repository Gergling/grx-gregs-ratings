import { PortableText } from "@portabletext/react";
import { fetchSingleArticleBySlug } from "../queries";
import { useQuery } from "@tanstack/react-query";

const ONE_DAY_MS = 1000 * 60 * 60 * 24;

type SingleBlogProps = { slug: string; };

export const SingleBlog = ({ slug }: SingleBlogProps) => {
  const {
    data,
    isLoading,
    error
  } = useQuery({
    queryKey: ['article', slug],
    queryFn: () => fetchSingleArticleBySlug(slug),
    staleTime: ONE_DAY_MS,
  });

  if (isLoading) return <>Loading...</>;
  if (error) return <>Error: {error.message}</>;
  if (!data) return <>No article found.</>;
  if (!data.body) return <>Article has no body.</>;

  return <PortableText value={data.body} />;
};
