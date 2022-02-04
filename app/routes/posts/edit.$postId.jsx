import { Link, redirect, useLoaderData } from "remix";
import PostService from "~/service/service";
import { getUser } from "~/utils/session.server";

export const loader = async ({ request, params }) => {
  const user = await getUser(request);
  const { post } = await PostService.GetPost(params.postId);

  const data = { post, user };

  return data;
};

export const action = async ({ request, params }) => {
  const form = await request.formData();

  const title = form.get("title");
  const body = form.get("body");

  const fields = {
    title,
    body,
  };

  const user = await getUser(request);

  await PostService.UpdatePost(user, fields, params.postId);

  return redirect("/posts");
};

function Edit() {
  const { post } = useLoaderData();
  const postUrl = `/posts/${post.id}`;

  return (
    <>
      <div className="page-header">
        <h1>Update Post</h1>
        <Link to={postUrl} className="btn btn-reverse">
          Back
        </Link>
      </div>

      <div className="page-content">
        <form method="POST">
          <div className="form-control">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" value={post.title} />
          </div>
          <div className="form-control">
            <label htmlFor="body">Post Body</label>
            <textarea name="body" id="body" value={post.body} />
          </div>
          <button type="submit" className="btn btn-block">
            Update Post
          </button>
        </form>
      </div>
    </>
  );
}

export default Edit;
