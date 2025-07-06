import { css } from 'lit';
import { utility } from './utility';

export const globalStyles = css`
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

  a {
    align-items: center;
    color: var(--a-color);
    cursor: pointer;
    display: inline-flex;
    text-decoration: none;
    transition: color 0.1s ease-in-out;

    &:has(card-component) {
      // color: inherit;

      &:hover {
        // color: var(--color-neutral-200);
      }
    }

    &:has(svg) {
      align-items: center;
      display: flex;
    }

    &:hover {
      color: var(--a-hover-color);
    }
  }

  body {
    background-color: var(--body-background-color);
    color: var(--text-color);
    display: flex;
    flex-direction: column;
    font-family: 'Noto Sans', 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.6;
    margin: 0;
    min-height: 100vh;
    padding: 0;

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

  button-component {
    box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.4);
    outline: 1px solid var(--color-black);
  }

  contact-component {
    right: 1rem;
  }

  contact-component,
  theme-toggle {
    --icon-color: inherit;
    --icon-padding: 0.25rem;
    --icon-size: 1.25rem;

    align-items: center;
    border: 1px solid var(--color-neutral-400);
    border-radius: 50%;
    bottom: 1rem;
    box-shadow: var(--box-shadow);
    cursor: pointer;
    display: flex;
    justify-content: center;
    padding: 0.5rem;
    position: fixed;
    z-index: 1;

    icon-component {
      --icon-color: blue;
      color: inherit;
    }
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
    /* color: var(--icon-color); */
    padding: var(--icon-padding);

    &:hover {
      color: var(--icon-hover-color);
    }
  }

  main {
    position: relative;
  }

  p {
    margin: 0;
    width: 100%; /* @todo: remove this and fix the issues it causes */
  }

  social-component {
    --icon-size: 1.25rem;
  }

  svg {
    fill: currentColor;
    /* height: 1rem; */
    /* width: 1rem; */
  }

  theme-toggle {
    left: 1rem;
  }

  li {
  }

  ul {
    margin: 0;
    padding: var(--padding);

    &.card-list {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      list-style: none;
    }
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
      font-size: 1.125rem;
      font-weight: 600;
      margin-bottom: 0.75rem;
    }

    p {
      color: var(--color-neutral-300);
      line-height: 1.5;
      margin: 0;
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

    &.auto-fit-15 {
      grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    }

    &.auto-fit-20 {
      grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    }

    &.auto-fit-300 {
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }

    &.column {
      grid-template-columns: repeat(auto-fit, minmax(256px, 1fr));
    }
  }

  .hero-description {
    color: var(--hero-description-color);
    font-size: 1.125rem;
    line-height: 1.7;
    margin: 0 auto;
    max-width: 48rem;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }

  .italic {
    font-style: italic;
  }

  .justify-content-center {
    justify-content: center;
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

  .margin-0-auto {
    margin: 0 auto;
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

  .quote {
    font-style: italic;
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
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .step-card {
    background-color: var(--step-card-background-color);
    border: 1px solid var(--color-neutral-600);
    border-radius: 0.5rem;
    display: grid;
    gap: 1rem;
    padding: 1.5rem;
    text-align: center;

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

  .width-100 {
    width: 100%;
  }

  ul.list {
    list-style-type: none;

    li {
      background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSIjZTNlM2UzIj48cGF0aCBkPSJNNTA0LTQ4MCAzMjAtNjY0bDU2LTU2IDI0MCAyNDAtMjQwIDI0MC01Ni01NiAxODQtMTg0WiIvPjwvc3ZnPg==');
      background-position: 0 0;
      background-size: 1.6rem 1.6rem;
      background-repeat: no-repeat;
      padding-left: 2.5rem;
    }
  }

  ${utility}
`;
