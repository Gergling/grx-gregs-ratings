import { useCallback } from "react";
import { articleTransformationFactory } from "../utilities";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getRoute } from "../../../routes";
import { FeaturedArticlesQueryResult, ListArticlesQueryResult } from "../../../libs/sanity";
import { fetchSingleArticleBySlug } from "../queries";

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
  const navigate = useNavigate();
  const transformer = useCallback(
    articleTransformationFactory(navigate, getRoute('blog').path),
    [navigate],
  );
  return useQuery({
    queryKey: [key],
    queryFn: fetcher,
    select: (data) => data.map(transformer),
    staleTime: ONE_DAY_MS,
  });
};
