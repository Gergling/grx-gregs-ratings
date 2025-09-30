import { BlogSummaryProps } from "@gergling/ui-components";
import {
  FeaturedArticlesQueryResult,
  ListArticlesQueryResult,
  SingleArticleBySlugQueryResult
} from "../../../libs/sanity";
import { SingleArrayElement } from "../../../libs/sanity/generic.types";
import { generatePath, NavigateFunction } from "react-router-dom";

export const articleTransformationFactory = <
  T extends
    | SingleArrayElement<FeaturedArticlesQueryResult>
    | SingleArticleBySlugQueryResult
    | SingleArrayElement<ListArticlesQueryResult>
>(
  navigate: NavigateFunction,
  basePath: string
) => (
  props: T
): BlogSummaryProps => {
  if (!props) return { media: {}, onClick: () => {}, subheader: '', title: 'No blog here' };

  const { image, slug, title } = props;
  const onClick = () => navigate(generatePath(basePath, { slug }));

  return {
    media: {
      image: image || undefined,
    },
    onClick,
    subheader: '',
    title,
  };
};
