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

  return {
    authModel: locals.pocketBase.authStore.model,
  };
}) satisfies PageServerLoad;

export const actions = {
  logout: async ({ locals }) => {
    if (
      !locals.pocketBase.authStore.isValid ||
      !validateUser(locals.pocketBase.authStore.model)
    ) {
      throw redirect(303, "/auth");
    }

    try {
      locals.pocketBase.authStore.clear();
    } catch (error) {
      if (error instanceof Error) {
        return {
          error: "log-out",
          message: error.message,
        };
      }

      return {
        error: "log-out",
        message: "An error occurred while logging out.",
      };
    }

    throw redirect(303, "/auth");
  },
  changeProfilePhoto: async ({ locals, request }) => {
    if (
      !locals.pocketBase.authStore.isValid ||
      !validateUser(locals.pocketBase.authStore.model)
    ) {
      throw redirect(303, "/auth");
    }

    const formData = await request.formData();

    const photo = formData.get("photo");

    try {
      if (!(photo instanceof File)) {
        throw new Error("Invalid photo");
      }

      if (photo.size === 0) {
        throw new Error("Invalid photo");
      }

      await locals.pocketBaseAdmin
        .collection("users")
        .update(locals.pocketBase.authStore.model.id, { photo });
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        return {
          error: "change-profile-photo",
          message: error.message,
        };
      }

      return {
        error: "change-profile-photo",
        message: "An error occurred while changing profile photo.",
      };
    }

    throw redirect(303, "/settings");
  },
  removeProfilePhoto: async ({ locals }) => {
    if (
      !locals.pocketBase.authStore.isValid ||
      !validateUser(locals.pocketBase.authStore.model)
    ) {
      throw redirect(303, "/auth");
    }

    try {
      await locals.pocketBaseAdmin
        .collection("users")
        .update(locals.pocketBase.authStore.model.id, { photo: null });
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        return {
          error: "remove-profile-photo",
          message: error.message,
        };
      }

      return {
        error: "remove-profile-photo",
        message: "An error occurred while removing profile photo.",
      };
    }

    throw redirect(303, "/settings");
  },
  changeName: async ({ locals, request }) => {
    if (
      !locals.pocketBase.authStore.isValid ||
      !validateUser(locals.pocketBase.authStore.model)
    ) {
      throw redirect(303, "/auth");
    }

    const formData = await request.formData();

    const name = formData.get("name");

    try {
      if (typeof name !== "string") {
        throw new Error("Invalid name");
      }

      if (name.length === 0) {
        throw new Error("Invalid name");
      }

      await locals.pocketBaseAdmin
        .collection("users")
        .update(locals.pocketBase.authStore.model.id, { name });
    } catch (error) {
      if (error instanceof Error) {
        return {
          error: "change-name",
          message: error.message,
        };
      }

      return {
        error: "change-name",
        message: "An error occurred while changing name.",
      };
    }

    throw redirect(303, "/settings");
  },
  changeEmail: async ({ locals, request }) => {
    if (
      !locals.pocketBase.authStore.isValid ||
      !validateUser(locals.pocketBase.authStore.model)
    ) {
      throw redirect(303, "/auth");
    }

    const formData = await request.formData();

    const email = formData.get("email");

    try {
      if (typeof email !== "string") {
        throw new Error("Invalid email");
      }

      if (email.length === 0) {
        throw new Error("Invalid email");
      }

      await locals.pocketBaseAdmin
        .collection("users")
        .update(locals.pocketBase.authStore.model.id, { email });
    } catch (error) {
      if (error instanceof Error) {
        return {
          error: "change-email",
          message: error.message,
        };
      }

      return {
        error: "change-email",
        message: "An error occurred while changing email.",
      };
    }

    throw redirect(303, "/settings");
  },
  changeBio: async ({ locals, request }) => {
    if (
      !locals.pocketBase.authStore.isValid ||
      !validateUser(locals.pocketBase.authStore.model)
    ) {
      throw redirect(303, "/auth");
    }

    const formData = await request.formData();

    const bio = formData.get("bio");

    try {
      if (typeof bio !== "string") {
        throw new Error("Invalid bio");
      }

      if (bio.length === 0) {
        throw new Error("Invalid bio");
      }

      await locals.pocketBaseAdmin
        .collection("users")
        .update(locals.pocketBase.authStore.model.id, { bio });
    } catch (error) {
      if (error instanceof Error) {
        return {
          error: "change-bio",
          message: error.message,
        };
      }

      return {
        error: "change-bio",
        message: "An error occurred while changing bio.",
      };
    }

    throw redirect(303, "/settings");
  },
  deleteAccount: async ({ locals }) => {
    if (
      !locals.pocketBase.authStore.isValid ||
      !validateUser(locals.pocketBase.authStore.model)
    ) {
      throw redirect(303, "/auth");
    }

    try {
      await locals.pocketBaseAdmin
        .collection("users")
        .delete(locals.pocketBase.authStore.model.id);

      locals.pocketBase.authStore.clear();
    } catch (error) {
      if (error instanceof Error) {
        return {
          error: "delete-account",
          message: error.message,
        };
      }

      return {
        error: "delete-account",
        message: "An error occurred while deleting a user.",
      };
    }

    throw redirect(303, "/auth");
  },
};
