<script lang="ts">
  import type { User } from "$lib/types";
  import { createEventDispatcher, getContext } from "svelte";
  import { authModelKey } from "./+page.svelte";
  import Button from "$lib/components/Button.svelte";
  import { fade } from "svelte/transition";
  import { enhance } from "$app/forms";

  let authModel = getContext<User>(authModelKey);

  let dispatchEvent = createEventDispatcher<{
    close: undefined;
  }>();

  let fileList: FileList | undefined;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  on:click={() => dispatchEvent("close")}
  transition:fade={{ duration: 100 }}
>
  <section on:click|stopPropagation>
    <header>
      <h1>Change your profile picture</h1>

      <Button
        variant="ghost"
        size="icon"
        on:click={() => dispatchEvent("close")}
      >
        <iconify-icon icon="iconamoon:close"></iconify-icon>
      </Button>
    </header>

    <form
      action="/settings?/changeProfilePhoto"
      method="post"
      enctype="multipart/form-data"
    >
      <label for="photo" class:hide={fileList}>
        <span>Upload photo</span>

        <input
          type="file"
          name="photo"
          id="photo"
          accept="image/png, image/jpg, image/gif, image/svg"
          bind:files={fileList}
        />
      </label>

      {#if fileList}
        <Button variant="primary">Confirm</Button>

        <Button
          on:click={(e) => {
            e.preventDefault();
            dispatchEvent("close");
          }}
        >
          Cancel
        </Button>
      {/if}
    </form>

    {#if authModel.photo && !fileList}
      <form action="/settings?/removeProfilePhoto" method="post">
        <Button>Remove current photo</Button>
      </form>
    {/if}
  </section>
</div>

<style>
  div {
    position: absolute;
    top: 0;
    left: 0;
    display: grid;
    place-items: center;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
  }

  section {
    padding: 1rem;
    border: solid 1px var(--tertiary-color);
    background-color: var(--primary-color);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
  }

  h1 {
    font-size: 16px;
  }

  iconify-icon {
    font-size: 24px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  label {
    text-align: center;
    font-size: 12px;
    padding: 5px;
    border: solid 1px var(--tertiary-color);
    border-radius: 4px;
    transition: all 150ms ease-in-out;
  }

  label:hover {
    background-color: var(--secondary-color);
  }

  .hide {
    display: none;
  }

  input {
    display: none;
  }
</style>
