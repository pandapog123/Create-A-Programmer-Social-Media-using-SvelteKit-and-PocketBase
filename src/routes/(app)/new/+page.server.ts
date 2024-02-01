import { validateUser } from "$lib/types";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ locals }) => {
  if (
    !locals.pocketBase.authStore.isValid ||
    !validateUser(locals.pocketBase.authStore.model)
  ) {
    throw redirect(303, "/auth");
  }

  return {};
}) satisfies PageServerLoad;

export const actions = {
  newPost: async ({ locals, request }) => {
    const authModel = locals.pocketBase.authStore.model;

    if (!locals.pocketBase.authStore.isValid || !validateUser(authModel)) {
      throw redirect(303, "/auth");
    }

    const formData = await request.formData();

    const title = formData.get("title");
    const content = formData.get("content");
    const language = formData.get("language");
    const tags = formData.get("tags");

    let postId;

    try {
      if (typeof title !== "string") {
        throw new Error("Invalid title");
      }

      if (title.length === 0) {
        throw new Error("Title cannot be empty");
      }

      if (typeof content !== "string") {
        throw new Error("Invalid content");
      }

      if (content.length === 0) {
        throw new Error("Content cannot be empty");
      }

      if (typeof language !== "string") {
        throw new Error("Invalid language");
      }

      if (language.length === 0) {
        throw new Error("Language cannot be empty");
      }

      if (typeof tags !== "string") {
        throw new Error("Invalid tags");
      }

      const parsedTags = JSON.parse(tags);

      if (!Array.isArray(parsedTags)) {
        throw new Error("Invalid tags");
      }

      let validatedTags: string[] = [];

      for (const tag of parsedTags) {
        if (typeof tag !== "string") {
          throw new Error("Invalid item in tags");
        }

        if (validatedTags.includes(tag)) {
          throw new Error("Cannot have duplicate tag");
        }

        validatedTags.push(tag);
      }

      if (validatedTags.length === 0 || validatedTags.length > 10) {
        throw new Error("Invalid tags");
      }

      const record = await locals.pocketBaseAdmin.collection("posts").create({
        title,
        content,
        tags: validatedTags,
        language,
        user: authModel.id,
      });

      postId = record.id;
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        return {
          message: error.message,
        };
      }

      return {
        message: "An error occurred while uploading code snippet.",
      };
    }

    if (postId) {
      throw redirect(303, `/posts/${postId}`);
    }

    throw redirect(303, "/");
  },
};
