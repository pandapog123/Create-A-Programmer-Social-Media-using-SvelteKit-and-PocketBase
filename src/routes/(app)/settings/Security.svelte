<script>
  import { enhance } from "$app/forms";

  import Button from "$lib/components/Button.svelte";
</script>

<section>
  <h1>Security</h1>

  <hr />

  <form action="/settings?/logout" method="post" use:enhance>
    <Button variant="destructive">Log out</Button>
  </form>

  <form action="/settings?/deleteAccount" method="post" use:enhance>
    <Button>Delete account</Button>
  </form>
</section>

<style>
  h1 {
    font-size: 24px;
  }

  h2 {
    font-size: 18px;
  }

  hr {
    border: none;
    border-top: solid 1px var(--tertiary-color);
  }

  section {
    flex-shrink: 1;
    background-color: var(--primary-color);
    padding: 1rem;
    border: solid 1px var(--tertiary-color);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  form {
    display: flex;
    flex-direction: column;

    gap: 8px;
  }
</style>
