import { css } from 'lit';
import { unsafeCSS } from 'lit';
import { chevronRight } from '../icons/chevron-right';

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

  :host {
    display: flex;
  }

  :host([hidden]) {
    display: none;
  }

  body {
    background-color: var(--background-color);
    color: var(--text-color);
    font-family: 'Noto Sans', 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    padding: 0;
    line-height: 1.6;
    min-height: 100vh;
    display: flex;
    flex-direction: column;

    &[data-media='desktop'] {
      .hidden-desktop {
        display: none;
      }
    }

    &[data-media='mobile'] {
      .hidden-mobile {
        display: none;
      }
    }
  }

  a {
    color: var(--a-color);
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

    &:hover {
      color: var(--color-blue-200);
    }

    &:not(:has(card-component)) {
      &:hover {
        color: var(--color-sky-200);
        transition: color 0.1s ease-in-out;
      }
    }
  }

  button-component {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
    outline: 1px solid var(--color-black);
  }

  contact-component {
    align-items: center;
    display: flex;
    height: var(--contact-component-height);
    justify-content: center;
    width: var(--contact-component-width);
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'Poppins', sans-serif;

    margin: 0;
  }

  h1 {
    color: var(--h1-color);
    font-size: var(--h1-font-size);
  }

  h2 {
    color: var(--h2-color);
    font-size: 2rem;
  }

  h3 {
    color: var(--h3-color);
  }

  hr {
    border-color: var(--color-neutral-800);
    width: 100%;
  }

  icon-component {
    padding: var(--padding);
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

  svg {
    fill: currentColor;
    /* height: 1rem; */
    /* width: 1rem; */
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

  .bold-5 {
    font-weight: 500;
  }

  .bold-6 {
    font-weight: 600;
  }

  .card-surface {
    background-color: var(--color-neutral-800);
    border: 1px solid var(--color-neutral-600);
    border-radius: 0.5rem;

    &:hover {
      border-color: var(--color-accent-500);
    }
  }

  .card-topic {
    background: var(--color-neutral-900);
    border: 1px solid var(--color-neutral-800);
    border-radius: 0.5rem;
    padding: 1.5rem;
    transition: border-color 0.2s ease;

    &:hover {
      border-color: var(--color-accent-500);
    }

    h3 {
      color: var(--color-neutral-100);
      margin-bottom: 0.75rem;
      font-size: 1.125rem;
      font-weight: 600;
    }

    p {
      color: var(--color-neutral-300);
      line-height: 1.5;
      margin: 0;
    }
  }

  .color-neutral-100 {
    color: var(--color-neutral-100);
  }

  .color-neutral-200 {
    color: var(--color-neutral-200);
  }

  .color-neutral-300 {
    color: var(--color-neutral-300);
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

  .font-size-1-125 {
    font-size: 1.125rem;
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

    &.auto-fit-15 {
      grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    }

    &.auto-fit-20 {
      grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    }

    &.auto-fit-300 {
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
  }

  .hero-description {
    font-size: 1.125rem;
    line-height: 1.7;
    color: var(--hero-description-color);
    max-width: 48rem;
    margin: 0 auto;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }

  .justify-content-flex-end {
    justify-content: flex-end;
  }

  .line-height-1-5 {
    line-height: 1.5;
  }

  .line-height-1-6 {
    line-height: 1.6;
  }

  .line-height-1-7 {
    line-height: 1.7;
  }

  .margin-auto {
    margin: 0 auto;
  }

  .margin-bottom-1 {
    margin-bottom: 1rem;
  }

  .margin-bottom-2 {
    margin-bottom: 2rem;
  }

  .margin-bottom-3 {
    margin-bottom: 3rem;
  }

  .margin-bottom-4 {
    margin-bottom: 4rem;
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

  .padding-1-25 {
    padding: 1.25rem;
  }

  .padding-1-5 {
    padding: 1.5rem;
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

  .step-card {
    display: grid;
    gap: 1rem;
    text-align: center;
    padding: 1.5rem;
    background-color: var(--color-neutral-800);
    border-radius: 0.5rem;
    border: 1px solid var(--color-neutral-600);

    @media (max-width: 768px) {
      padding: 1.25rem;
    }
  }

  .teal-200 {
    color: var(--color-teal-200);
  }

  .text-align-center {
    text-align: center;
  }
`;
