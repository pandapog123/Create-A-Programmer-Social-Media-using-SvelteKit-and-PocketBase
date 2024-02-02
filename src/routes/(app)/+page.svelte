<script lang="ts">
  import PostComponent from "$lib/components/PostComponent.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<svelte:head>
  <title>Home - CS</title>
</svelte:head>

<div class="container">
  {#if data.result["not-found"]}
    <article><h1>No posts found</h1></article>
  {:else if data.result.posts}
    {#await data.result.posts}
      <article><h1>Loading posts</h1></article>
    {:then posts}
      {#each posts as post}
        <article>
          <PostComponent authModel={data.authModel} {post} />
        </article>
      {:else}
        <article><h1>No posts found</h1></article>
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

  article {
    background-color: var(--primary-color);
    border-radius: 8px;
    border: solid 1px var(--tertiary-color);
    max-width: 40rem;
    flex-grow: 1;
    width: 60vw;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
</style>
