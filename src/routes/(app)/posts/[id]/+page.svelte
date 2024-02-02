<script lang="ts">
  import type { PageData } from "./$types";
  import PostComponent from "$lib/components/PostComponent.svelte";

  export let data: PageData;
</script>

<svelte:head>
  <title>
    {data.post ? data.post.title : "Post not found"}
  </title>
</svelte:head>

<div class="container">
  <article>
    {#if data["not-found"]}
      <p class="not-found">Post not found</p>
    {:else if data.post}
      <PostComponent authModel={data.authModel} post={data.post} />
    {/if}
  </article>
</div>

<style>
  .container {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
  }

  article {
    background-color: var(--primary-color);
    border-radius: 8px;
    width: 45rem;
    max-width: 60vw;
    flex-grow: 1;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
