import { useQuery } from "@tanstack/react-query";
import { FeaturedArticlesQueryResult, ListArticlesQueryResult } from "../../../libs/sanity";
import { fetchSingleArticleBySlug } from "../queries";
import { useArticleTransformationFactory } from "./use-article-transformation-factory";

const ONE_DAY_MS = 1000 * 60 * 60 * 24;

export const useBlogItemQuery = (
  slug: string,
) => useQuery({
  queryKey: ['article', slug],
  queryFn: () => fetchSingleArticleBySlug(slug),
  staleTime: ONE_DAY_MS,
});

export const useBlogListQuery = <
  T extends FeaturedArticlesQueryResult | ListArticlesQueryResult,
>(
  fetcher: () => Promise<T>,
  key: 'featured-articles' | 'list-articles',
) => {
  const transformer = useArticleTransformationFactory();
  return useQuery({
    queryKey: [key],
    queryFn: fetcher,
    select: (data) => data.map(transformer),
    staleTime: ONE_DAY_MS,
  });
};
