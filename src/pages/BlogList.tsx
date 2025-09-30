import { AllBlogs } from "../features/blogs";
import { PageContainer } from "./Styles";

export const BlogListPage: React.FC = () => {
  return (
    <PageContainer>
      <AllBlogs />
    </PageContainer>
  );
};
