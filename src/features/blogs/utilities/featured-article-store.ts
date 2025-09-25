import { defineQuery } from 'groq';
import { client, PostsQueryResult } from "../../../libs/sanity";
import { transformArticle } from "./transform-article";
import { create } from 'zustand';
import { BlogSummaryProps } from '@gergling/ui-components';

const featuredArticlesQuery = defineQuery(`*[_type == "post"]
  | order(publishedAt desc)
  [0...3]
  {
    title,
    slug,
    mainImage{
      asset->{
        url
      }
    },
    categories,
    publishedAt
  }`
);

type State = {
  articles: BlogSummaryProps[];
  error?: string;
  loading: boolean;
};

type Action = {
  fetch: () => Promise<void>;
};

export const featuredArticleStore = create<State & Action>((set) => ({
  articles: [],
  loading: false,
  fetch: async () => {
    set({ loading: true, error: undefined });
    try {
      const posts = await client.fetch<PostsQueryResult>(featuredArticlesQuery);
      const articles = posts.map(transformArticle);
      set({ articles });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },
}));
