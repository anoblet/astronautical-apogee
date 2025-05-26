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

    --background-color: var(--color-neutral-900);
    --border-radius: 0.25rem;
    --gap: 1rem;
    --outline: 1px solid #000;
    --padding: 1rem;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  * {
    opacity: 1;

    &:not(html, body) {
      &:not(:defined),
      &:has(*:not(:defined)),
      &:has(image-component:not([loaded])) {
        opacity: 0;
      }
    }
  }

  body {
    background-color: var(--background-color);
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

    :hover {
      svg {
        fill: var(--color-rose-400);
      }
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
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
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
    padding: var(--padding);

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
    padding: var(--padding);
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

  .align-items-center {
    align-items: center;
  }

  .align-self-center {
    align-self: center;
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

  .flex-end {
    justify-self: flex-end;
  }

  .font-size-1-5 {
    font-size: 1.5rem;
  }

  .font-size-2 {
    font-size: 2rem;
  }

  .font-weight-5 {
    font-weight: 500;
  }

  .font-weight-6 {
    font-weight: 600;
  }

  .font-weight-8 {
    font-weight: 800;
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
    padding: var(--padding);
  }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
  .padding-0 {
    padding: 0;                                                                                                                                                                                                                                                                                                                                                                           
  }

  .page {
    max-width: 1024px;
    width: 100%;

    &.wide {
      max-width: unset;
    }
  }

  .text-align-center {
    text-align: center;
  }
`;
