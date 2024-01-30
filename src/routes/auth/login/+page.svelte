<script lang="ts">
  import Link from "$lib/components/Link.svelte";
  import Button from "$lib/components/Button.svelte";
  import type { ActionData } from "./$types";
  import { enhance } from "$app/forms";

  export let form: ActionData;

  let email = form?.email ?? "";
  let password = form?.password ?? "";

  $: error = form?.message;
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<section class="container">
  <form
    method="post"
    use:enhance={() => {
      return async ({ update }) => {
        await update({ reset: false, invalidateAll: true });
      };
    }}
  >
    <div class="heading">
      <h1>Log into an Account</h1>

      <p>
        Log into an account and get back to sharing your favorite code snippets!
      </p>
    </div>

    <div class="input-fields">
      <div class="input-container">
        <h2>Email</h2>
        <input
          type="email"
          name="email"
          bind:value={email}
          placeholder="Enter your e-mail"
        />
      </div>

      <div class="input-container">
        <h2>Password</h2>
        <input
          type="password"
          name="password"
          bind:value={password}
          placeholder="Enter your password"
        />
      </div>

      {#if error}
        <p class="error">{error}</p>
      {/if}
    </div>

    <Button
      variant="primary"
      size="large"
      disabled={email.length === 0 || password.length < 8}
    >
      Log in!
    </Button>
  </form>

  <div class="link">
    <p>Don't have an account?</p>

    <Link href="/auth/create-account">Create an Account</Link>

    <p class="terms">
      By logging into your account you accept CodeShare's privacy policy and
      terms of service.
    </p>
  </div>
</section>

<style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 3rem;
    flex-grow: 1;
    padding: 2rem;
    overflow: scroll;
    background-color: var(--primary-color);
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .heading {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .heading h1 {
    font-size: 24px;
    font-weight: 700;
  }

  .heading p {
    font-size: 14px;
    font-weight: 400;
    opacity: 0.7;
    line-height: 20px;
  }

  .input-fields {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  h2 {
    font-size: 16px;
    font-weight: 600;
  }

  input {
    border: solid 1px var(--tertiary-color);
    background-color: var(--secondary-color);
    border-radius: 4px;
    padding: 8px;
    font-size: 12px;
  }

  .error {
    color: var(--destructive-color);
    font-size: 12px;
  }

  .link {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .link p {
    font-size: 14px;
    opacity: 0.6;
  }

  p.terms {
    font-size: 12px;
    opacity: 0.5;
  }
</style>
