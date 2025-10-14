import { AllBlogs } from "../features/blogs";
import { PageContainer } from "../common/components/styles";

export const BlogListPage: React.FC = () => {
  return (
    <PageContainer>
      <AllBlogs />
    </PageContainer>
  );
};
