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

  throw redirect(303, `/profiles/${locals.pocketBase.authStore.model.id}`);
}) satisfies PageServerLoad;
