import { BlogSummaryProps } from "@gergling/ui-components";
import { PostsQueryResult } from "../../../libs/sanity";

export const transformArticle = ({ mainImage, slug: { current: slug }, title }: PostsQueryResult[number]): BlogSummaryProps => {
  return {
    media: {
      image: mainImage?.asset?.url || '',
    },
    slug,
    subheader: '',
    title,
  };
};
