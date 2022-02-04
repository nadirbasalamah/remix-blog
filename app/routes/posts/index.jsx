import { Link, useLoaderData } from "remix";
import PostService from "~/service/service";

export const loader = async () => {
  const data = await PostService.GetAllPosts();
  return data;
};

function PostItems() {
  const { posts } = useLoaderData();

  return (
    <>
      <div className="page-header">
        <h1>Posts</h1>
        <Link to="/posts/new" className="btn">
          New Post
        </Link>
      </div>
      <ul className="posts-list">
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={post.id}>
              <h3>{post.title}</h3>
              {new Date(post.createdAt).toLocaleString()}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default PostItems;
