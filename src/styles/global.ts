import { css } from "lit";
import { unsafeCSS } from "lit";
import { chevronRight } from "../icons/chevron-right";

export const globalStyles = css`
  :root {
    &:not(.dark) {
      --background-color: #fff;
      --button-secondary-color: var(--color-neutral-200);
      --h1-color: var(--color-neutral-900);
      --text-color: var(--color-neutral-900);
    }
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
    color: var(--text-color);
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

  :host([hidden]) {
    display: none;
  }

  a {
    color: var(--color-teal-200);
    cursor: pointer;
    display: inline-flex;
    text-decoration: none;
    transition: color 0.1s ease-in-out;

    &:has(card-component) {
      color: inherit;

      &:hover {
        color: var(--color-neutral-200);
      }
    }

    &:has(svg) {
      display: flex;
      align-items: center;
    }

    &:not(:has(card-component)) {
      &:hover {
        color: var(--color-sky-200);
        transition: color 0.1s ease-in-out;
      }
    }

    :hover {
      svg {
        fill: var(--color-rose-400);
      }
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
    font-family: "Poppins", sans-serif;

    margin: 0;
  }

  h1 {
    color: var(--h1-color);
    font-size: var(--h1-font-size);
  }

  h2 {
    color: var(--color-blue-200);
    font-size: 2rem;
  }

  h3 {
    color: var(--color-amber-200);
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

  .justify-content-center {
    justify-content: center;
  }

  li::marker {
    content: ${unsafeCSS(chevronRight)};
  }

  main {
    position: relative;
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

  .bold-5{
    font-weight: 500;
  }

  .bold-6 {
    font-weight: 600;
  }

  .divider {
    height: 1rem;
  }

  .flex {
    display: flex;
    &.column {
      flex-direction: column;
    }
  }

  .flex-1 {
    flex: 1;
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

  .gap-0-2-5 {
    gap: 0.25rem;
  }

  .gap-0-5 {
    gap: 0.5rem;
  }

  .gap-2 {
    gap: 2rem;
  }

  .gap-3 {
    gap: 3rem;
  }

  .gap-4 {
    gap: 4rem;
  }

  .grid {
    display: grid;

    &.column {
      grid-template-columns: repeat(auto-fit, minmax(256px, 1fr));
    }
  }

  .justify-content-flex-end {
    justify-content: flex-end;
  }

  .max-width-48 {
    max-width: 48rem;
  }

  .max-width-56 {
    max-width: 56rem;
  }

  .max-width-64 {
    max-width: 64rem;
  }

  .overflow-x-auto {
    overflow-x: auto;
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

  .rose-200 {
    color: var(--color-rose-200);
  }

  .rose-400 {
    color: var(--color-rose-400);
  }

  .space {
    height: 1rem;
  }

  .space-0-5 {
    height: 0.5rem;
  }

  .space-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .text-align-center {
    text-align: center;
  }
`;
