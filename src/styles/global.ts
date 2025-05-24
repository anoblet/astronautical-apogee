import { css } from "lit";
import { unsafeCSS } from "lit";
import { chevronRight } from "../icons/chevron-right";

export const globalStyles = css`
  :root {
    --box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

    /* Color scheme */
    --primary-color: var(--color-teal-200);
    --secondary-color: var(--color-rose-400);
    --tertiary-color: var(--color-blue-400);
    --quaternary-color: var(--color-amber-200);

    --border-radius: 0.25rem;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  * {
    opacity: 1;

    &:not(:defined),
    &:has(*:not(:defined)),
    &:has(image-component:not([loaded])) {
      opacity: 0;
    }
  }

  body {
    background: var(--color-neutral-900);
    color: var(--color-neutral-200);
    font-family: "Noto Sans", "Roboto", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    padding: 0;
    line-height: 1.6;
    min-height: 100vh;
    display: flex;
    flex-direction: column;

    &[data-media="desktop"] {
      .hidden-desktop {
        display: none;
      }
    }

    &[data-media="mobile"] {
      .hidden-mobile {
        display: none;
      }
    }
  }

  :host {
    display: flex;
  }

  a {
    cursor: pointer;
    text-decoration: none;

    &:has(svg) {
      display: flex;
      align-items: center;
    }
  }

  a:not(:has(project-card)):not(:has(service-card)) {
    color: var(--color-teal-200);
    transition: color 0.1s ease-in-out;

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
    color: var(--color-neutral-200);
  }

  hr {
    border-color: var(--color-neutral-800);
    width: 100%;
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
    margin: 0;

    &.card-list {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      list-style: none;
    }
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

  .columns {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .antialiased {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .overflow-x-auto {
    overflow-x: auto;
  }

  .flex {
    display: flex;
    &.column {
      flex-direction: column;
    }
  }

  .gap {
    gap: 1rem;
  }

  .grid {
    display: grid;

    &.column {
      grid-template-columns: repeat(auto-fit, minmax(256px, 1fr));
    }
  }

  .padding {
    padding: 1rem;
  }

  .text-align-center {
    text-align: center;
  }
`;
