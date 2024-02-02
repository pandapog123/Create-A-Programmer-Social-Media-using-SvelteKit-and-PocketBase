<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import PostComponent from "$lib/components/PostComponent.svelte";
  import { pb } from "$lib/pocketbase";
  import type { PageData } from "./$types";

  export let data: PageData;

  let { result } = data;
</script>

<svelte:head>
  <title>{result.user ? result.user.name : "User not found"} - CS</title>
</svelte:head>

<div class="container">
  <header>
    {#if result.user}
      <div class="first-row">
        <div class="user-information">
          {#if $pb && result.user.photo}
            <img
              src={$pb.getFileUrl(result.user, result.user.photo)}
              alt={result.user.name}
            />
          {:else}
            <iconify-icon icon="mingcute:user-4-fill"></iconify-icon>
          {/if}

          <h1>{result.user.name}</h1>
        </div>
      </div>

      {#if result.user.bio}
        <hr />

        <p class="bio">{result.user.bio}</p>
      {/if}
    {:else}
      <h1 class="not-found">{"User not found"}</h1>
    {/if}
  </header>

  {#if result.posts}
    {#await result.posts}
      <article>
        <h1>Loading Posts</h1>
      </article>
    {:then posts}
      {#each posts as post}
        <article>
          <PostComponent authModel={data.authModel} {post} />
        </article>
      {:else}
        <p>No posts found</p>
      {/each}
    {/await}
  {/if}
</div>

<style>
  .container {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }

  article,
  header {
    background-color: var(--primary-color);
    border-radius: 8px;
    border: solid 1px var(--tertiary-color);
    max-width: 40rem;
    flex-grow: 1;
    width: 60vw;
    padding: 1rem;
    display: flex;
    flex-direction: column;
  }

  article {
    gap: 1rem;
  }

  header {
    gap: 12px;
  }

  hr {
    border: none;
    border-top: 1px solid var(--tertiary-color);
  }

  .first-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .user-information {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  h1 {
    font-size: 20px;
    font-weight: 400;
  }

  h1.not-found {
    text-align: center;
  }

  img {
    height: 40px;
    width: 40px;
    object-fit: cover;
  }

  iconify-icon {
    font-size: 40px;
  }
</style>
