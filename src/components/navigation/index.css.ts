import { css } from "lit";

export const style = css`
  :host {
    background-color: var(--color-neutral-900);
    display: flex;
    flex: 1;
    gap: 2rem;
    justify-content: space-between;
    opacity: 1;
    transition: opacity 0.2s ease-in-out;
    width: 100%;
  }

  :host([hidden]) {
    opacity: 0 !important;
    transition: opacity 0.2s ease-in-out;
  }

  ul {
    align-items: center;
    display: flex;
    flex: 1;
    list-style: none;
  }

  li {
    align-items: center;
    display: flex;
    height: 100%;

    &:hover {
      background-color: rgba(255, 255, 255, 0.05);
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;

      a {
        color: var(--color-rose-400);
      }
    }

    a {
      padding: 0 2.5rem;
    }
  }
`;
