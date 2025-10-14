import { useParams } from "react-router-dom";
import { SingleBlog } from "../features/blogs";
import { PageContainer } from "../common/components/styles";

export const BlogPage: React.FC = () => {
  const { slug } = useParams();

  if (!slug) return <>No slug for BlogPage.</>;

  return (
    <PageContainer>
      <SingleBlog slug={slug} />
    </PageContainer>
  );
};
