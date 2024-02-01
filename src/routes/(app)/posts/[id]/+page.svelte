<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import Highlight from "highlight.js";
  import { pb } from "$lib/pocketbase";
  import { fade } from "svelte/transition";
  import { enhance } from "$app/forms";

  export let data: PageData;

  let contentRef: HTMLElement | undefined;

  onMount(() => {
    if (!contentRef || data["not-found"] || !data.conversation) {
      return;
    }

    Highlight.highlightElement(contentRef);
  });
</script>

<svelte:head>
  <title>
    {data.conversation ? data.conversation.title : "Post not found"}
  </title>
</svelte:head>

<div class="container">
  <article>
    {#if data["not-found"]}
      <p class="not-found">Post not found</p>
    {:else if data.conversation}
      <header>
        <h1>{data.conversation.title}</h1>

        {#if data.authModel && data.conversation.user.id === data.authModel.id}
          <Button size="icon" variant="destructive">
            <iconify-icon icon="ph:trash"></iconify-icon>
          </Button>
        {/if}
      </header>

      <pre>
          <div class="language">{data.conversation.language}</div>
          <code bind:this={contentRef}>
            {data.conversation.content}
          </code>
        </pre>

      <section class="actions">
        <a href="/users/{data.conversation.user.id}" class="account">
          {#if $pb && data.conversation.user.photo}
            <img
              src={$pb.getFileUrl(
                data.conversation.user,
                data.conversation.user.photo
              )}
              alt={data.conversation.user.name}
            />
          {:else}
            <iconify-icon icon="ic:round-account-circle"></iconify-icon>
          {/if}

          <p>{data.conversation.user.name}</p>
        </a>

        <div class="interactions">
          {#if data.authModel}
            <form
              action="/posts/{data.conversation.id}?/toggleLiked"
              method="post"
              use:enhance={() => {
                if (data.conversation && data.authModel) {
                  if (data.conversation.likes.includes(data.authModel.id)) {
                    let { id } = data.authModel;
                    data.conversation.likes = data.conversation.likes.filter(
                      (user) => user !== id
                    );
                  } else {
                    data.conversation.likes = [
                      ...data.conversation.likes,
                      data.authModel.id,
                    ];
                  }
                }

                return async ({ update }) => {
                  await update({ invalidateAll: true, reset: true });
                };
              }}
            >
              <Button size="icon" variant="ghost">
                {#key data.conversation.likes}
                  <iconify-icon
                    in:fade={{ duration: 200 }}
                    icon="mdi:heart{data.conversation.likes.includes(
                      data.authModel.id
                    )
                      ? ''
                      : '-outline'}"
                    class:liked={data.conversation.likes.includes(
                      data.authModel.id
                    )}
                  ></iconify-icon>
                {/key}
              </Button>
            </form>
          {/if}
        </div>
      </section>
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

  pre {
    tab-size: 4;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  code {
    border-radius: 8px;
    padding: 0 1rem;
    overflow-x: scroll;
  }

  header {
    display: flex;
    justify-content: space-between;
  }

  h1 {
    font-size: 24px;
  }

  iconify-icon {
    font-size: 20px;
  }

  .language {
    position: absolute;
    background-color: var(--secondary-color);
    padding: 8px 1rem;
    border-radius: 8px;
    top: 1rem;
    right: 1rem;
    color: var(--accent-color);
  }

  .actions {
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    overflow: scroll;
    padding: 4px;
  }

  .account {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    text-decoration: none;
  }

  .interactions {
    display: flex;
    justify-content: space-between;
    gap: 8px;
  }

  .interactions iconify-icon {
    font-size: 24px;
  }

  .liked {
    color: var(--accent-color);
  }

  img {
    width: 32px;
    height: 32px;
    border-radius: 100px;
    object-fit: cover;
  }

  .account iconify-icon {
    font-size: 32px;
  }
</style>
