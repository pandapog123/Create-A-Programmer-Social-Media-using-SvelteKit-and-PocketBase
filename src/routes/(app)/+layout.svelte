<script lang="ts">
  import type { PageData } from "./$types";
  import Link from "$lib/components/Link.svelte";

  export let data: PageData;
</script>

<div class="main">
  <aside>
    <div class="top">
      <a href="/">
        <h1 class="md-show">CodeShare</h1>
        <h1 class="md-hide">CS</h1>
      </a>

      <hr />

      <section class="links">
        <Link href="/" variant="ghost" align="left">
          <div class="link-content">
            <iconify-icon icon="octicon:home-fill-24"></iconify-icon>
            <span> Home </span>
          </div>
        </Link>

        <Link href="/search" variant="ghost" align="left">
          <div class="link-content">
            <iconify-icon icon="material-symbols:search"></iconify-icon>
            <span> Search </span>
          </div>
        </Link>

        <Link href="/discover" variant="ghost" align="left">
          <div class="link-content">
            <iconify-icon icon="iconamoon:discover-bold"></iconify-icon>
            <span> Discover </span>
          </div>
        </Link>

        {#if data.authenticated}
          <Link href="/profile" variant="ghost" align="left">
            <div class="link-content">
              <iconify-icon icon="ic:baseline-account-circle"></iconify-icon>
              <span> Profile </span>
            </div>
          </Link>

          <Link href="/settings" variant="ghost">
            <div class="link-content">
              <iconify-icon icon="material-symbols:settings"></iconify-icon>
              <span> Settings </span>
            </div>
          </Link>
        {/if}
      </section>

      <section class="links icons">
        <Link href="/" variant="ghost" size="icon">
          <iconify-icon icon="octicon:home-fill-24"></iconify-icon>
        </Link>

        <Link href="/search" variant="ghost" size="icon">
          <iconify-icon icon="material-symbols:search"></iconify-icon>
        </Link>

        <Link href="/discover" variant="ghost" size="icon">
          <iconify-icon icon="iconamoon:discover-bold"></iconify-icon>
        </Link>

        {#if data.authenticated}
          <Link href="/profile" variant="ghost" size="icon">
            <iconify-icon icon="ic:baseline-account-circle"></iconify-icon>
          </Link>

          <Link href="/settings" variant="ghost" size="icon">
            <iconify-icon icon="material-symbols:settings"></iconify-icon>
          </Link>
        {/if}
      </section>
    </div>

    <div class="links">
      {#if data.authenticated}
        <Link href="/new" variant="primary" size="large">
          <div class="link-content create">
            <iconify-icon icon="mingcute:add-fill"></iconify-icon>
            <span> Create </span>
          </div>
        </Link>
      {:else}
        <Link href="/auth" variant="primary" size="large">
          Create an account
        </Link>
      {/if}
    </div>

    <div class="links icons">
      {#if data.authenticated}
        <Link href="/new" variant="primary" size="icon">
          <iconify-icon icon="mingcute:add-fill"></iconify-icon>
        </Link>
      {:else}
        <Link href="/settings" size="icon" variant="primary">
          <iconify-icon icon="mdi:login"></iconify-icon>
        </Link>
      {/if}
    </div>
  </aside>

  <main>
    <slot />
  </main>
</div>

<style>
  .main {
    display: flex;
    background-color: var(--secondary-color);
    flex-grow: 1;
    overflow: hidden;
  }

  aside {
    background-color: var(--primary-color);
    border-right: solid 1px var(--tertiary-color);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    padding: 1rem;
    overflow: scroll;
  }

  hr {
    border: none;
    border-top: solid 1px var(--tertiary-color);
  }

  .top > a {
    text-decoration: none;
    display: grid;
    place-items: center;
  }

  .top {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  aside h1 {
    color: var(--accent-color);
    font-size: 24px;
  }

  main {
    overflow: scroll;
    height: 100vh;
    flex-grow: 1;
  }

  .md-show {
    display: none;
  }

  .md-hide {
    display: block;
  }

  .links {
    display: none;
    flex-direction: column;
    gap: 8px;
  }

  .link-content {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  iconify-icon {
    font-size: 22px;
  }

  .link-content span {
    font-size: 14px;
  }

  .link-content.create {
    justify-content: center;
  }

  .link-content.create iconify-icon {
    font-size: 16px;
    color: var(--text-color);
  }

  .link-content.create span {
    color: var(--text-color);
  }

  .icons {
    display: flex;
  }

  @media (min-width: 800px) {
    aside {
      min-width: 10rem;
      align-items: unset;
    }

    .md-show {
      display: block;
    }

    .md-hide {
      display: none;
    }

    .links {
      display: flex;
    }

    .icons {
      display: none;
    }
  }
</style>
