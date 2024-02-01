<script lang="ts">
  import { enhance } from "$app/forms";
  import Button from "$lib/components/Button.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  let title = "";
  let language = "";
  let content = "";
  let tags: string[] = [];
  let tagInput = "";
</script>

<svelte:head>
  <title>New Post - CS</title>
</svelte:head>

<article>
  <form
    class="main"
    method="post"
    action="/new?/newPost"
    use:enhance={({ formData }) => {
      formData.append("tags", JSON.stringify(tags));
    }}
  >
    <h1>Create a New Code Snippet</h1>

    <hr />

    <div class="input-container">
      <h2>Title</h2>

      <input
        type="text"
        name="title"
        placeholder="Enter a valid title"
        bind:value={title}
      />
    </div>

    <div class="input-container">
      <h2>Language</h2>

      <select name="language" id="" bind:value={language}>
        <option value="cs">C#</option>
        <option value="c">C</option>
        <option value="cpp">C++</option>
        <option value="dart">Dart</option>
        <option value="go">Go</option>
        <option value="java">Java</option>
        <option value="js">JavaScript</option>
        <option value="ts">TypeScript</option>
        <option value="py">Python</option>
        <option value="rs">Rust</option>
      </select>
    </div>

    <div class="input-container">
      <h2>Content</h2>

      <textarea
        name="content"
        placeholder="Enter your code snippet"
        bind:value={content}
      />
    </div>

    <div class="input-container">
      <h2>Tags</h2>

      <form
        class="tag-form"
        on:submit|preventDefault={() => {
          if (
            tags.includes(tagInput) ||
            tagInput === "" ||
            tags.length === 10
          ) {
            return;
          }

          tags = [...tags, tagInput];
          tagInput = "";
        }}
      >
        <input
          type="text"
          placeholder="Add at least 1 tag for your post"
          bind:value={tagInput}
        />

        <Button>Add tag</Button>
      </form>

      <div class="tags-container">
        {#each tags as tag}
          <div class="tag">
            <span class="tag-content">
              {tag}
            </span>

            <button
              on:click={() => (tags = tags.filter((value) => value !== tag))}
            >
              <iconify-icon icon="iconamoon:close"></iconify-icon>
            </button>
          </div>
        {:else}
          <p class="no-tag">Please enter at least 1 tag for your post</p>
        {/each}
      </div>
    </div>

    <Button
      variant="primary"
      disabled={title === "" ||
        content === "" ||
        language === "" ||
        tags.length === 0}
    >
      Post Code Snippet
    </Button>
  </form>
</article>

<style>
  article {
    padding: 1rem;
    display: flex;
    justify-content: center;
  }

  .main {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: var(--primary-color);
    border-radius: 8px;
    border: solid 1px var(--tertiary-color);
    padding: 1rem;
    max-width: 40rem;
    flex-grow: 1;
  }

  h1 {
    font-size: 24px;
  }

  h2 {
    font-size: 20px;
  }

  hr {
    border: none;
    border-top: solid 1px var(--tertiary-color);
  }

  .input-container {
    display: flex;
    gap: 8px;
    flex-direction: column;
  }

  input,
  textarea,
  select {
    border: solid 1px var(--tertiary-color);
    border-radius: 4px;
    background-color: var(--secondary-color);
    font-size: 14px;
    padding: 6px;
    flex-grow: 1;
    min-width: none;
  }

  textarea {
    resize: vertical;
    min-height: 72px;
  }

  .tag-form {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .tag {
    border: solid 1px var(--tertiary-color);
    background-color: var(--secondary-color);
    border-radius: 100px;
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 3px;
    padding: 4px;
    padding-left: 8px;
  }

  .tag button {
    border: solid 1px var(--tertiary-color);
    border-radius: 100px;
    display: grid;
    place-items: center;
    width: 20px;
    height: 20px;
    padding: 0;
    background-color: transparent;
  }

  .tag button:hover {
    background-color: var(--tertiary-color);
  }

  iconify-icon {
    font-size: 16px;
  }

  .no-tag {
    font-size: 14px;
    opacity: 0.7;
  }
</style>
