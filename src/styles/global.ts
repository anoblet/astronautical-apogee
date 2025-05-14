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

  p {
    margin: 0;
  }
`;
