import { css } from "lit";
import { unsafeCSS } from "lit";
import { chevronRight } from "../icons/chevron-right";

export const globalStyles = css`
  :root {
    --box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

    --primary-color: var(--color-teal-200);
    --secondary-color: var(--color-rose-400);
    --tertiary-color: var(--color-blue-400);
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

  a {
    &:has(svg) {
      display: flex;
      align-items: center;
    }
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

  button-component {
    outline: 1px solid var(--color-black);
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  icon-component {
    padding: 1rem;

    svg {
      color: var(--color-teal-200);
    }
  }

  li::marker {
    content: ${unsafeCSS(chevronRight)};
  }

  p {
    margin: 0;
  }

  project-card {
    ul {
      color: var(--color-neutral-200);
    }
  }

  service-card {
    [slot="content"] {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }

  svg {
    fill: currentColor;
  }

  ul {
    padding: 1rem;
  }

  .chips {
    color: var(--secondary-color);
    display: flex;
    gap: 1rem;
    overflow: hidden;
    text-wrap: nowrap;

    &:hover {
      overflow-x: auto;
      scrollbar-width: none;
    }
  }

  .flex {
    display: flex;
    &.column {
      flex-direction: column;
    }
    &.gap {
      gap: 1rem;
    }
  }

  .gap {
    gap: 1rem;
  }

  .grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(256px, 1fr));
  }

  .padding {
    padding: 1rem;
  }

  .text-align-center {
    text-align: center;
  }
`;
