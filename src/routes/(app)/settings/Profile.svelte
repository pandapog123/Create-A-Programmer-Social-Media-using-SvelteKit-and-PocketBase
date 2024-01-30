<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import { pb } from "$lib/pocketbase";
  import type { User } from "$lib/types";
  import { getContext } from "svelte";
  import ChangeProfilePicture from "./ChangeProfilePicture.svelte";
  import { authModelKey } from "./+page.svelte";

  let authModel = getContext<User>(authModelKey);

  let showChangeProfilePicture = false;
</script>

{#if $pb}
  <section>
    <h1>Profile</h1>

    <div class="profile">
      <div class="profile-content">
        {#if authModel.photo}
          <img
            src={$pb.getFileUrl(authModel, authModel.photo)}
            alt={authModel.name}
          />
        {:else}
          <iconify-icon icon="mingcute:user-4-fill"></iconify-icon>
        {/if}

        <span class="name">{authModel.name}</span>
      </div>

      <div class="profile-actions">
        <Button
          variant="ghost"
          on:click={(e) => {
            showChangeProfilePicture = true;
            e.stopPropagation();
          }}
        >
          Change Profile Picture
        </Button>
      </div>
    </div>
  </section>

  {#if showChangeProfilePicture}
    <ChangeProfilePicture on:close={() => (showChangeProfilePicture = false)} />
  {/if}
{/if}

<style>
  h1 {
    font-size: 24px;
  }

  section {
    background-color: var(--primary-color);
    padding: 1rem;
    border: solid 1px var(--tertiary-color);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .profile {
    border: solid 1px var(--tertiary-color);
    border-radius: 8px;
    display: flex;
    gap: 2rem;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
  }

  .profile-content {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  img {
    width: 28px;
    height: 28px;
    border-radius: 100px;
    object-fit: cover;
  }

  iconify-icon {
    font-size: 28px;
  }

  .name {
    font-weight: bold;
    font-size: 14px;
  }
</style>
