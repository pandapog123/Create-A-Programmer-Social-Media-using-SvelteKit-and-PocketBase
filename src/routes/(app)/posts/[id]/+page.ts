import { pb } from "$lib/pocketbase";
import { get } from "svelte/store";
import type { PageLoad } from "./$types";
import { validatePost, type Post } from "$lib/types";
import type { RecordModel } from "pocketbase";

export const load = (async ({ params }) => {
  let pbInstance = get(pb);

  if (!pbInstance) {
    return {
      "not-found": true,
    };
  }

  try {
    const result = await pbInstance
      .collection("posts")
      .getOne<RecordModel>(params.id, {
        expand: "user",
      });

    let conversation = result;

    if (!result.expand) {
      return {
        "not-found": true,
      };
    }

    conversation.user = result.expand.user;

    if (!validatePost(conversation)) {
      return {
        "not-found": true,
      };
    }

    return {
      conversation,
    };
  } catch (error) {
    return {
      "not-found": true,
    };
  }
}) satisfies PageLoad;
