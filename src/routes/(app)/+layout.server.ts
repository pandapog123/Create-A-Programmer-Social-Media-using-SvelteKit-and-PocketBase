import type { LayoutServerLoad } from "./$types";

export const load = (async ({ locals }) => {
  return {
    authenticated: locals.pocketBase.authStore.isValid,
  };
}) satisfies LayoutServerLoad;
