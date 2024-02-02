import { pb } from "$lib/pocketbase";
import { get } from "svelte/store";
import type { PageLoad } from "./$types";
import { validatePost } from "$lib/types";
import type { RecordModel } from "pocketbase";

export const load = (async ({ params }) => {
  let pbInstance = get(pb);

  if (!pbInstance) {
    return {
      "not-found": true,
    };
  }

  try {
    async function getPost() {
      if (!pbInstance) {
        throw new Error("Post not found");
      }

      const result = await pbInstance.collection("posts").getOne(params.id, {
        expand: "user",
      });

      let post = result;

      if (!result.expand) {
        throw new Error("Post not found");
      }

      post.user = result.expand.user;

      if (!validatePost(post)) {
        throw new Error("Post not found");
      }

      return post;
    }

    return {
      post: await getPost(),
    };
  } catch (error) {
    return {
      "not-found": true,
    };
  }
}) satisfies PageLoad;
