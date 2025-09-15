import { useEffect, useState } from 'react';
import { client, Post } from '../../../libs/sanity';
import { defineQuery } from 'groq';

const postsQuery = defineQuery(`*[_type == "post"]
  | order(publishedAt desc)
  [0...2]
  {
    title,
    slug,
    mainImage,
    categories,
    publishedAt
  }`
);

// const clientFetch = async () => {
//   const post = await client.fetch(postsQuery);

// }

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    client.fetch<Post[]>(postsQuery)
      .then(data => setPosts(data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.map(post => (
        <div key={post.slug?.current}>
          <h2>{post.title}</h2>
          {/* Add your blog body rendering here */}
        </div>
      ))}
    </div>
  );
};

export default Blog;