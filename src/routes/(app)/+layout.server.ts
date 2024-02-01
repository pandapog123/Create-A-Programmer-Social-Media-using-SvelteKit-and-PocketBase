import { validateUser } from "$lib/types";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ locals }) => {
  if (
    locals.pocketBase.authStore.isValid &&
    validateUser(locals.pocketBase.authStore.model)
  ) {
    return {
      authenticated: true,
      authModel: locals.pocketBase.authStore.model,
    };
  }

  return {
    authenticated: locals.pocketBase.authStore.isValid,
    authModel: undefined,
  };
}) satisfies LayoutServerLoad;
