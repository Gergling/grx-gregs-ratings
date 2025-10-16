import { BlogList, Typography } from '@gergling/ui-components';
import { fetchFeaturedArticles } from '../queries';
import { useBlogListQuery } from '../hooks';
import { PaneContainer } from '../../../common/components/PaneContainer';
import { CircularProgress } from '@mui/material';

const BlogHandler = () => {
  const {
    data,
    isLoading,
    error
  } = useBlogListQuery(fetchFeaturedArticles, 'featured-articles');

  // TODO: Needs pulsing shapes for blog panels. Should probably build that into the component library.
  if (isLoading) return <div style={{
    display: 'flex',
    height: '10rem',
    justifyContent: 'center',
    alignItems: 'center',
  }}>
    <CircularProgress size={30} />
  </div>;
  if (error) {
    console.error('Error loading featured blogs', error);
    return <>
      <Typography sx={{ textAlign: 'center' }} variant='h6'>Oh... oh no... that's bad.</Typography>
      <p>
        Apologies, there seems to have been error of some kind while attempting to get the <i>most featured</i> of our fine collection of blogs.
      </p>
      <p>
        Well... good luck!
      </p>
    </>;
  }
  if (!data) {
    console.error('No data for featured articles, but no error or loading signal indicated either.');
    return <>Well... it would seem there are no articles. That's unusual.</>;
  }

  // TODO: Component library images need to handle when images are still loading.
  return (
    <BlogList articles={data.map(({ subheader, ...props }) => ({ ...props, subheader: '' }))} />
  );
}

export const FeaturedBlogs = () => {
  return (
    <PaneContainer>
      <BlogHandler />
    </PaneContainer>
  );
};
