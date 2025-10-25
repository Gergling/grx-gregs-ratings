import { FeaturedBlogs } from '../features/blogs/components/FeaturedBlogs';
import { RandometricsPane } from '../features/randometrics';
import { useElasticResponse } from '../features/elastic-response';
import { useMemo } from 'react';
import { HomePageContainer } from './Home.style';

export const HomePage: React.FC = () => {
  const { getWidth } = useElasticResponse();
  const width = useMemo(
    // TODO: This number might be possible to hardcode in the project somewhere.
    () => getWidth(7),
    [getWidth]
  );

  return (
    <HomePageContainer width={width}>
      <RandometricsPane />
      <FeaturedBlogs />
    </HomePageContainer>
  );
};
