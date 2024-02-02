import { validatePost, validateUser, type Post } from "$lib/types";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { RecordModel } from "pocketbase";

export const load = (async () => {
  return {};
}) satisfies PageServerLoad;

export const actions = {
  toggleLiked: async ({ locals, params, url }) => {
    const authModel = locals.pocketBase.authStore.model;

    if (!locals.pocketBase.authStore.isValid || !validateUser(authModel)) {
      throw redirect(303, "/auth");
    }

    try {
      const postRecord = await locals.pocketBase
        .collection("posts")
        .getOne<Post & RecordModel>(params.id, { expand: "user" });

      let post = postRecord;

      if (!postRecord.expand) {
        throw new Error(`Invalid post`);
      }

      post.user = postRecord.expand.user;

      if (!validatePost(post)) {
        throw new Error(`Invalid post`);
      }

      const isLiked = post.likes.includes(authModel.id);

      if (isLiked) {
        await locals.pocketBaseAdmin.collection("posts").update(params.id, {
          "likes-": authModel.id,
        });
      } else {
        await locals.pocketBaseAdmin.collection("posts").update(params.id, {
          "likes+": authModel.id,
        });
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        return {
          message: error.message,
        };
      }

      return {
        message: "Unknown error occured when trying to like post",
      };
    }
    const customRedirectPath = url.searchParams.get("redirect");

    if (customRedirectPath) {
      throw redirect(303, `${url.origin}${customRedirectPath}`);
    }

    throw redirect(303, `/posts/${params.id}`);
  },
  deletePost: async ({ locals, params }) => {
    const authModel = locals.pocketBase.authStore.model;

    if (!locals.pocketBase.authStore.isValid || !validateUser(authModel)) {
      throw redirect(303, "/auth");
    }

    try {
      const postRecord = await locals.pocketBase
        .collection("posts")
        .getOne<Post & RecordModel>(params.id, { expand: "user" });

      let post = postRecord;

      if (!postRecord.expand) {
        throw new Error(`Invalid post`);
      }

      post.user = postRecord.expand.user;

      if (!validatePost(post)) {
        throw new Error(`Invalid post`);
      }

      const ownsPost = post.user.id === authModel.id;

      if (!ownsPost) {
        throw new Error(`Cannot delete post`);
      }

      await locals.pocketBaseAdmin.collection("posts").delete(params.id);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        return {
          message: error.message,
        };
      }

      return {
        message: "Unknown error occured when trying to like post",
      };
    }

    throw redirect(303, `/`);
  },
};
