import { css } from "lit";

export const globalStyles = css`
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  * {
    opacity: 1;
    transition: opacity 0.2s ease-in-out;

    &:has(*:not(:defined)) {
      opacity: 0;
    }

    &:not(:defined) {
      opacity: 0;
    }
  }

  :host {
    display: flex;
  }

  a {
    color: var(--color-teal-200);
    transition: color 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
      color: var(--color-rose-400);
      transition: color 0.2s ease-in-out;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  p {
    margin: 0;
  }
`;
