import PocketBase from "pocketbase";
import { browser } from "$app/environment";
import { writable } from "svelte/store";

export const pb = writable<PocketBase | undefined>(undefined, (set) => {
  if (!browser) {
    return;
  }

  const pocketbaseInstance = new PocketBase("http://localhost:8090");

  pocketbaseInstance.authStore.loadFromCookie(document.cookie);

  set(pocketbaseInstance);
});
