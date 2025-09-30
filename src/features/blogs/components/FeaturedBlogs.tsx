import { BlogList } from '@gergling/ui-components';
import { fetchFeaturedArticles } from '../queries';
import { useBlogListQuery } from '../hooks';

export const FeaturedBlogs = () => {
  const {
    data,
    isLoading,
    error
  } = useBlogListQuery(fetchFeaturedArticles, 'featured-articles');

  if (isLoading) return <>Loading</>;
  if (error) return <>Error: {error.message}</>;
  if (!data) return <>No articles found.</>;

  return (
    <div>
      <BlogList articles={data} />
    </div>
  );
};
