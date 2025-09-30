import { fetchListArticles } from "../queries";
import { generatePath } from "react-router-dom";
import { getRoute } from "../../../routes";
import { useBlogListQuery } from "../hooks";

export const AllBlogs = () => {
  const {
    data,
    isLoading,
    error
  } = useBlogListQuery(fetchListArticles, 'list-articles');

  if (isLoading) return <>Loading</>;
  if (error) return <>Error: {error.message}</>;
  if (!data) return <>No articles found.</>;

  return <ul>
    {data.map(({
      slug,
      title
    }) => <li key={slug}>
      <a href={generatePath(getRoute('blog').path, { slug })}>
        {title}
      </a>
    </li>)}
  </ul>;
};
