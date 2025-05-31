import { css } from "lit";

export const style = css`
  :host {
    background-color: var(--color-neutral-900);
    display: flex;
    flex: 1;
    justify-content: space-between;
    opacity: 1;
    transition: opacity 0.2s ease-in-out;
    width: 100%;
    z-index: 1;
  }

  :host([hidden]) {
    opacity: 0 !important;
    transition: opacity 0.2s ease-in-out;
  }

  a {
    color: inherit;
  }

  li {
    align-items: center;
    display: flex;
    height: 100%;

    &:hover {
      cursor: pointer;
    }

    a {
      padding: 0 2rem;
    }
  }

  social-component {
    color: var(--color-teal-200);
  }

  ul {
    align-items: center;
    display: flex;
    flex: 1;
    list-style: none;
  }
`;
