import { css } from "lit";

export const style = css`
  :host([opened]) {
    aside {
      left: 0;
      transition: left 0.2s ease-in-out;
    }
  }

  aside {
    background-color: var(--color-neutral-900);
    height: 100vh;
    left: -100vw;
    position: fixed;
    transition: left 0.2s ease-in-out;
    width: 100vw;
  }

  svg {
    height: 2rem;
    width: 2rem;
  }
`;
