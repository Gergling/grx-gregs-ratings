import { useEffect } from 'react';
import { BlogList } from '@gergling/ui-components';
import { featuredArticleStore } from '../utilities/featured-article-store';

export const FeaturedBlogs = () => {
  const { articles, fetch } = featuredArticleStore();

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      <BlogList articles={articles} />
    </div>
  );
};
