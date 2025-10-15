import { fetchListArticles } from "../queries";
import { useBlogListQuery } from "../hooks";
import { BlogSummaryProps } from "@gergling/ui-components";
import { Box, Card, CardHeader, CardMedia } from "@mui/material";
import { ImageLoader } from "../../../common/components/ImageLoader";
import { StyledBlogListContainer, StyledBlogListItemCardActionArea } from "./AllBlogs.style";
import { ReadablePublishingTime } from "./ReadablePublishingTime";

const BlogItemCard = ({
  onClick,
  media: { image },
  subheader,
  title,
}: BlogSummaryProps) => {
  return (
    <Card sx={{ width: '23rem' }}>
      <StyledBlogListItemCardActionArea onClick={onClick}>
        <Box sx={{
          position: 'relative',
          width: 100
        }}>
          <ImageLoader image={image}>
            <CardMedia
              component="img"
              image={image}
              sx={{ height: 100 }}
              title={title as string}
            />
          </ImageLoader>
        </Box>
        <CardHeader
          slotProps={{
            title: {
              sx: {
                fontSize: '1rem',
                fontWeight: '1000',
              },
              variant: 'h6',
            }
          }}
          title={title}
          subheader={<ReadablePublishingTime publishedAt={subheader as string} />}
        />
      </StyledBlogListItemCardActionArea>
    </Card>
  )
}

export const AllBlogs = () => {
  const {
    data,
    isLoading,
    error
  } = useBlogListQuery(fetchListArticles, 'list-articles');

  if (isLoading) return <>Loading</>;
  if (error) return <>Error: {error.message}</>;
  if (!data) return <>No articles found.</>;

  return <StyledBlogListContainer>
    {data.map((blog) => <BlogItemCard key={blog.slug} {...blog} />)}
  </StyledBlogListContainer>;
};
