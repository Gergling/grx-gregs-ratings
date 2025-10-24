import { BlogSummaryProps } from "@gergling/ui-components";
import {
  FeaturedArticlesQueryResult,
  ListArticlesQueryResult,
  SingleArticleBySlugQueryResult
} from "../../../libs/sanity";
import { SingleArrayElement } from "../../../libs/sanity/generic.types";
import { useBlogNavigate } from "./use-navigate";

export const useArticleTransformationFactory = <
  T extends
    | SingleArrayElement<FeaturedArticlesQueryResult>
    | SingleArticleBySlugQueryResult
    | SingleArrayElement<ListArticlesQueryResult>
>() => {
  const navigate = useBlogNavigate();
  return (
    props: T
  ): BlogSummaryProps & { slug: string; } => {
    if (!props) return {
      media: {},
      onClick: () => {},
      slug: '',
      subheader: '',
      title: 'No blog here'
    };

    const { image, publishedAt, slug, title } = props;
    const onClick = () => navigate(slug);

    return {
      media: {
        image: image || undefined,
      },
      onClick,
      slug,
      subheader: publishedAt,
      title,
    };
  };
};