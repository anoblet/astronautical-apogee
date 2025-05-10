import { css } from "lit";

export const globalStyles = css`
  *:not(:defined) {
    display: none;
  }

  a {
    svg {
      color: var(--color-teal-200);

      &:hover {
        color: var(--color-rose-400);
      }
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
`;
