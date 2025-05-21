import { css } from "lit";

export const style = css`
  :host {
    background-color: var(--color-neutral-900);
    position: relative;
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

  aside {
    background-color: var(--color-neutral-900);
    height: 100vh;
    left: -100vw;
    position: fixed;
    transition: left 0.2s ease-in-out;
    width: 100vw;
    z-index: 1;
  }

  icon-component {
    color: var(--color-teal-200);
    cursor: pointer;
    z-index: 1;
  }

  svg {
    height: 2rem;
    width: 2rem;
  }

  .title {
    align-items: center;
    color: var(--color-teal-200);
    display: flex;
    flex: 1;
    font-size: 1.25rem;
    font-weight: 600;
    height: 100%;
    justify-content: center;
    padding: 1rem;
    position: absolute;
    width: 100%;
  }
`;
