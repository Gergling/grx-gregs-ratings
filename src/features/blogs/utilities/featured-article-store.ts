import { transformArticle } from "./transform-article";
import { create } from 'zustand';
import { BlogSummaryProps } from '@gergling/ui-components';
import { fetchFeaturedArticles } from '../queries';

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
      const posts = await fetchFeaturedArticles();
      const articles = posts.map(transformArticle);
      set({ articles });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },
}));
