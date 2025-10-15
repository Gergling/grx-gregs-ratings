import { BlogList } from '@gergling/ui-components';
import { fetchFeaturedArticles } from '../queries';
import { useBlogListQuery } from '../hooks';
import { PaneContainer } from '../../../common/components/PaneContainer';

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
    <PaneContainer>
      <BlogList articles={data.map(({ subheader, ...props }) => ({ ...props, subheader: '' }))} />
    </PaneContainer>
  );
};
