import { db } from "~/utils/db.server";

class PostService {
  static async AddPost(fields) {
    const post = await db.post.create({
      data: fields,
    });

    return post;
  }

  static async GetAllPosts() {
    const data = {
      posts: await db.post.findMany({
        take: 20,
        select: { id: true, title: true, createdAt: true },
        orderBy: { createdAt: "desc" },
      }),
    };

    return data;
  }

  static async GetPost(postId) {
    const post = await db.post.findUnique({
      where: { id: postId },
    });

    if (!post) throw new Error("Post not found");

    const data = { post };
    return data;
  }

  static async UpdatePost(user, fields, postId) {
    const { post } = await this.GetPost(postId);

    if (user && post.userId === user.id) {
      const updatedPost = await db.post.update({
        where: {
          id: postId,
        },
        data: fields,
      });

      return updatedPost;
    }
  }

  static async DeletePost(user, postId) {
    const { post } = await this.GetPost(postId);

    if (user && post.userId === user.id) {
      await db.post.delete({ where: { id: postId } });
    }
  }
}

export default PostService;
