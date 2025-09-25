import { BlogSummaryProps } from "@gergling/ui-components";
import { FeaturedArticlesQueryResult } from "../../../libs/sanity";
import { SingleArrayElement } from "../../../libs/sanity/generic.types";

// This just generates "never" types for some reason.
// Will need to come up with my own system. Probably can still create a
// "base", but it will need to sit separately from the queries.

// This can go in "type-constants.ts".
// const baseArticleStringProps = ['title', 'slug', 'image', 'publishedAt'] as const;
// const baseArticleCategoryProps = ['description', 'title'] as const;

// This can go in "types.ts".
// type BaseArticleStringProps = typeof baseArticleStringProps[number];
// type BaseArticleCategoryProps = typeof baseArticleCategoryProps[number];
// type BaseArticleCategory = Record<BaseArticleCategoryProps, string | null>;
// type BaseArticle = Record<BaseArticleStringProps, string> & {
//   categories: BaseArticleCategory[];
// };
  // categories[]->{description, title},

// type BaseArticleOverride = Record<BaseArticleStringProps, string | null> & {
//   categories: BaseArticleCategory[] | null;
// };

// TODO: Data could come back empty because we can't control the backend from here.
// How to handle.
export const transformArticle = ({
  image,
  slug,
  title
}: SingleArrayElement<FeaturedArticlesQueryResult>): BlogSummaryProps => {
  return {
    media: {
      image: image || undefined,
    },
    slug,
    subheader: '',
    title,
  };
};
