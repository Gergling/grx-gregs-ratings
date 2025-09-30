import { BlogList } from '@gergling/ui-components';
import { fetchFeaturedArticles } from '../queries';
import { articleTransformationFactory } from '../utilities/transform-article';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getRoute } from '../../../routes';
import { useCallback } from 'react';

export const FeaturedBlogs = () => {
  const navigate = useNavigate();
  const transformer = useCallback(
    articleTransformationFactory(navigate, getRoute('blog').path),
    [navigate],
  );
  const {
    data,
    isLoading,
    error
  } = useQuery({
    queryKey: ['featured-articles'],
    queryFn: fetchFeaturedArticles,
    select: (data) => data.map(transformer),
  });

  if (isLoading) return <>Loading</>;
  if (error) return <>Error: {error.message}</>;
  if (!data) return <>No articles found.</>;

  return (
    <div>
      <BlogList articles={data} />
    </div>
  );
};
