import { css } from "lit";

export const style = css`
  :host {
    background-color: var(--color-neutral-900);
    display: flex;
    justify-content: space-between;
    opacity: 1;
    transition: opacity 0.2s ease-in-out;
    width: 100%;
  }

  :host([hidden]) {
    opacity: 0 !important;
    transition: opacity 0.2s ease-in-out;
  }

  :host([opened]) {
    aside {
      left: 0;
      transition: left 0.2s ease-in-out;
    }
  }

  a {
    display: flex;
    align-items: center;
  }

  aside {
    background-color: var(--color-neutral-900);
    height: 100vh;
    left: -100vw;
    position: fixed;
    width: 100vw;
  }

  svg {
    fill: currentColor;
    height: 2rem;
    width: 2rem;
  }

  #icon {
    padding: 1rem;
  }

  #menu {
    padding: 1rem;
  }
`;
