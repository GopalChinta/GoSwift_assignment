import { getDb } from "./db";
import { User, Post, Comment } from "./types";

export async function loadData(): Promise<boolean> {
  const db = await getDb();
  const usersCol = db.collection("users");

  const [users, posts, comments] = await Promise.all([
    fetch("https://jsonplaceholder.typicode.com/users").then(res => res.json()),
    fetch("https://jsonplaceholder.typicode.com/posts").then(res => res.json()),
    fetch("https://jsonplaceholder.typicode.com/comments").then(res => res.json())
  ]);

  const userData: User[] = users.slice(0, 10).map((user: any) => {
    const userPosts: Post[] = posts
      .filter((p: any) => p.userId === user.id)
      .map((p: any) => {
        const postComments: Comment[] = comments.filter((c: any) => c.postId === p.id);
        return {
          id: p.id,
          title: p.title,
          body: p.body,
          comments: postComments
        };
      });

    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      address: user.address,
      phone: user.phone,
      website: user.website,
      company: user.company,
      posts: userPosts
    };
  });

  await usersCol.deleteMany({});
  await usersCol.insertMany(userData);
  return true;
}
