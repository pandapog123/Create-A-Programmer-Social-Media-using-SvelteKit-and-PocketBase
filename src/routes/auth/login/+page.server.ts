import { redirect } from "@sveltejs/kit";

export const actions = {
  default: async ({ locals, request }) => {
    if (locals.pocketBase.authStore.isValid) {
      throw redirect(303, "/");
    }

    let formData = await request.formData();

    let email = formData.get("email");
    let password = formData.get("password");

    try {
      if (typeof email !== "string") {
        throw new Error("Invalid email");
      }

      if (email.length < 1) {
        throw new Error("Email cannot be empty");
      }

      if (typeof password !== "string") {
        throw new Error("Invalid password");
      }

      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters");
      }

      await locals.pocketBase
        .collection("users")
        .authWithPassword(email, password);
    } catch (error) {
      if (error instanceof Error) {
        return {
          email: typeof email !== "string" ? "" : email,
          password: typeof password !== "string" ? "" : password,
          message: error.message,
        };
      }

      return {
        email: typeof email !== "string" ? "" : email,
        password: typeof password !== "string" ? "" : password,
        message: "Unknown error occured while trying to create an account",
      };
    }

    throw redirect(303, "/");
  },
};
