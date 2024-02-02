import { pb } from "$lib/pocketbase";
import { get } from "svelte/store";
import type { PageLoad } from "./$types";
import { validatePost, validateUser, type Post } from "$lib/types";
import type { RecordModel } from "pocketbase";

export const load = (async ({ params }) => {
  let pbInstance = get(pb);

  if (!pbInstance) {
    return {
      result: {
        "not-found": true,
      },
    };
  }

  try {
    const user = await pbInstance.collection("users").getOne(params.id);

    if (!validateUser(user)) {
      throw new Error("Post not found");
    }

    async function getPosts() {
      if (!pbInstance) {
        throw new Error("User not found");
      }

      const posts = await pbInstance
        .collection("posts")
        .getFullList<Post & RecordModel>({
          filter: `user="${user.id}"`,
          expand: "user",
        });

      return posts.reduce<(Post & RecordModel)[]>((prev, cur) => {
        let post = cur;

        if (!cur.expand) {
          return prev;
        }

        post.user = cur.expand.user;

        if (!validatePost(post)) {
          return prev;
        }

        return [...prev, post];
      }, []);
    }

    return {
      result: {
        user,
        posts: getPosts(),
      },
    };
  } catch (error) {
    return {
      result: {
        "not-found": true,
      },
    };
  }
}) satisfies PageLoad;
