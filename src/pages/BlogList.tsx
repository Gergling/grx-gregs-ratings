import { AllBlogs } from "../features/blogs";
import { PageContainer } from "../common/components/styles";
import { Seo } from "../common/components/Seo";

export const BlogListPage: React.FC = () => {
  return (
    <PageContainer>
      <Seo
        title="Blog Posts"
        description="Gregory, Michael & Davies cruel and unusual measurements, ratings and categorisations presents: Blogs."
      />
      <AllBlogs />
    </PageContainer>
  );
};
