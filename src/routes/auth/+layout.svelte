<main>
  <section>
    <h1>CodeShare</h1>

    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
      temporibus itaque expedita deleniti vel sint, doloremque quia ipsum illum,
      fugit laborum nisi minus porro est libero minima omnis blanditiis!
      Incidunt?
    </p>
  </section>

  <article>
    <slot />
  </article>
</main>

<style>
  main {
    height: 100vh;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
  }

  article {
    display: flex;
    height: 100vh;
  }

  section {
    display: none;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    flex-direction: column;
    background-image: radial-gradient(
      circle at 200% 150%,
      var(--complementary-color),
      var(--accent-color)
    );
    overflow: hidden;
  }

  h1 {
    color: var(--primary-color);
    font-size: 48px;
  }

  p {
    color: var(--primary-color);
    text-align: center;
    font-size: 16px;
    line-height: 20px;
    font-weight: 500;
  }

  @media (min-width: 550px) {
    main {
      grid-template-columns: 1fr 1fr;
    }

    section {
      display: flex;
    }

    p {
      width: 25ch;
    }
  }

  @media (min-width: 700px) {
    main {
      /* grid-template-columns: 0.8fr 1.2fr; */
      grid-template-columns: 1.2fr 0.8fr;
    }

    p {
      width: 38ch;
    }
  }
</style>
