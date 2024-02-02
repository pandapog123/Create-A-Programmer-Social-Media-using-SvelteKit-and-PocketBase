<script lang="ts">
  export let href: string;
  export let variant: "primary" | "outline" | "ghost" | "destructive" =
    "outline";
  export let size: "large" | "small" | "icon" = "small";
  export let align: "center" | "left" = "center";
</script>

<a class="{variant} {size} {align}" {href} on:click tabindex="-1">
  <slot />
</a>

<style>
  a {
    text-decoration: none;
    transition: all 150ms ease-in-out;
    background-color: transparent;
    cursor: pointer;
  }

  a:focus {
    outline: solid 2px var(--accent-color);
    outline-offset: 1px;
  }

  .center {
    text-align: center;
  }

  .left {
    text-align: left;
  }

  .small {
    font-size: 15px;
    padding: 6px 16px;
    border-radius: 4px;
  }

  .large {
    font-size: 18px;
    padding: 12px 20px;
    border-radius: 8px;
  }

  .icon {
    padding: 0;
    width: 40px;
    height: 40px;
    display: grid;
    place-items: center;
    border-radius: 4px;
  }

  .primary {
    background-color: var(--accent-color);
    border: solid 1px var(--accent-color);
    color: var(--primary-color);
  }

  .primary:hover {
    opacity: 0.8;
  }

  .destructive {
    background-color: var(--destructive-color);
    border: solid 1px var(--destructive-color);
    color: var(--primary-color);
  }

  .destructive:hover {
    opacity: 0.8;
  }

  .outline {
    border: solid 1px var(--tertiary-color);
  }

  .outline:hover,
  .ghost:hover {
    background-color: var(--secondary-color);
  }

  .outline,
  .ghost {
    opacity: 0.8;
  }

  .ghost {
    border: solid 1px transparent;
  }
</style>
