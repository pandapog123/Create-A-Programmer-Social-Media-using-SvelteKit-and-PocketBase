<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import type { User } from "$lib/types";
  import { getContext } from "svelte";
  import { authModelKey } from "./+page.svelte";

  let authModel = getContext<User>(authModelKey);

  let bio = authModel?.bio ?? "";
</script>

<section class="account-settings">
  <h1>Account Settings</h1>

  <hr />

  <form action="/settings?/changeName" method="post">
    <h2>Name</h2>

    <div class="form-inputs">
      <input type="text" name="name" value={authModel.name} />

      <Button>Update Name</Button>
    </div>
  </form>

  <form action="/settings?/changeEmail" method="post">
    <h2>Email Preference</h2>

    <div class="form-inputs">
      <input type="email" name="email" value={authModel.email} />

      <Button>Update Email</Button>
    </div>
  </form>

  <form class="bio" action="/settings?/changeBio" method="post">
    <h2>Bio</h2>

    <div class="form-inputs">
      <label for="bio">
        <input
          type="text"
          name="bio"
          id="bio"
          bind:value={bio}
          on:input={(e) => {
            if (e.currentTarget.value.length > 150) {
              bio = bio.slice(0, 150);
            }
          }}
          placeholder="Enter a valid bio"
        />

        <p>{bio.length}/150</p>
      </label>

      <div>
        <Button>Update bio</Button>
      </div>
    </div>
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
    flex-grow: 1;
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

  input {
    background-color: var(--secondary-color);
    border: solid 1px var(--tertiary-color);
    border-radius: 4px;
    padding: 6px;
    font-size: 12px;
  }

  .form-inputs {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  form.bio .form-inputs {
    flex-direction: column;
  }

  form.bio input {
    flex: 1;
    background-color: transparent;
    border: none;
    border-radius: 0;
    padding: 0;
    outline: none;
  }

  form.bio label {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
    background-color: var(--secondary-color);
    border: solid 1px var(--tertiary-color);
    border-radius: 4px;
    padding: 6px;
    font-size: 12px;
  }

  form.bio p {
    font-size: 11px;
    opacity: 0.7;
    font-weight: 500;
    text-align: end;
  }

  form.bio label:has(input:focus) {
    outline: solid 2px var(--complementary-color);
  }
</style>
