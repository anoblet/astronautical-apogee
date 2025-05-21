import { css } from "lit";
import { unsafeCSS } from "lit";
import { chevronRight } from "../icons/chevron-right";

export const globalStyles = css`
  :root {
    --primary-color: var(--color-teal-200);
    --secondary-color: var(--color-rose-400);
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  * {
    opacity: 1;
    /* transition: opacity 0.2s ease-in-out; */

    &:not(:defined),
    &:has(*:not(:defined)),
    &:has(image-component:not([loaded])) {
      opacity: 0;
    }
  }

  :host {
    display: flex;
  }

  a:not(:has(project-card)):not(:has(service-card)) {
    color: var(--color-teal-200);
    transition: color 0.1s ease-in-out;
    text-decoration: none;

    &:hover {
      color: var(--color-rose-400);
      transition: color 0.1s ease-in-out;
    }

    svg {
      fill: currentColor;
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

  li::marker {
    content: ${unsafeCSS(chevronRight)};
  }

  button-component {
    outline: 1px solid var(--color-black);
  }

  icon-component {
    padding: 1rem;

    svg {
      color: var(--color-teal-200);
    }
  }

  svg {
    fill: currentColor;
  }

  .grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(256px, 1fr));
  }

  .text-align-center {
    text-align: center;
  }
`;
