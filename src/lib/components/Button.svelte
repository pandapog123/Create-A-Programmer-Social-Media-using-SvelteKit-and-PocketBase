<script lang="ts">
  export let variant: "primary" | "outline" | "ghost" | "destructive" =
    "outline";
  export let size: "large" | "small" | "icon" = "small";
  export let align: "center" | "left" = "center";
  export let disabled = false;
</script>

<button class="{variant} {size} {align}" {disabled} on:click tabindex="-1">
  <slot />
</button>

<style>
  button {
    text-decoration: none;
    transition: all 150ms ease-in-out;
    text-align: center;
    background-color: transparent;
    cursor: pointer;
  }

  button:disabled {
    cursor: not-allowed;
  }

  button:focus {
    outline: solid 2px var(--accent-color);
    outline-offset: 1px;
  }

  .small {
    font-size: 12px;
    padding: 5px 15px;
    border-radius: 5px;
  }

  .large {
    font-size: 14px;
    padding: 8px 16px;
    border-radius: 8px;
  }

  .center {
    text-align: center;
  }

  .left {
    text-align: left;
  }

  .icon {
    padding: 0;
    width: 32px;
    height: 32px;
    display: grid;
    place-items: center;
    border-radius: 4px;
  }

  .primary {
    background-color: var(--accent-color);
    border: solid 1px var(--accent-color);
    color: var(--primary-color);
  }

  .primary:hover:not(:disabled) {
    opacity: 0.8;
  }

  .primary:disabled,
  .destructive:disabled {
    background-color: var(--secondary-color);
    border: solid 1px var(--secondary-color);
  }

  .destructive {
    background-color: var(--destructive-color);
    border: solid 1px var(--destructive-color);
    color: white;
  }

  .destructive:hover:not(:disabled) {
    opacity: 0.8;
  }

  .outline {
    border: solid 1px var(--tertiary-color);
  }

  .outline:hover:not(:disabled),
  .ghost:hover:not(:disabled) {
    background-color: var(--secondary-color);
  }

  .outline:disabled,
  .ghost:disabled {
    opacity: 0.6;
  }

  .ghost {
    border: solid 1px transparent;
  }
</style>
