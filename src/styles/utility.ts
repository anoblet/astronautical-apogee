import { css } from 'lit';

export const utility = css`
  .align-content-space-around {
    align-content: space-around;
  }

  .align-items-center {
    align-items: center;
  }

  .align-self-center {
    align-self: center;
  }

  .align-self-flex-end {
    align-self: flex-end;
  }

  .color-tertiary {
    color: var(--tertiary-color);
  }

  .flex-wrap {
    flex-wrap: wrap;
  }

  .font-weight-500 {
    font-weight: 500;
  }

  .font-weight-600 {
    font-weight: 600;
  }

  .font-weight-700 {
    font-weight: 700;
  }

  .font-weight-800 {
    font-weight: 800;
  }

  .gap-0-25 {
    gap: 0.25rem;
  }

  .gap-0-5 {
    gap: 0.5rem;
  }

  .height-0-25 {
    height: 0.25rem;
  }

  .height-0-5 {
    height: 0.5rem;
  }

  .justify-content-center {
    justify-content: center;
  }

  .justify-content-space-around {
    justify-content: space-around;
  }

  .margin-auto {
    margin: auto;
  }

  .space-around {
    justify-content: space-around;
  }

  .space-between {
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .visually-hidden {
    display: none;
    visibility: hidden;
  }

  .padding-top-3 {
    padding-top: 3rem;
  }

  .padding-top-5 {
    padding-top: 5rem;
  }

  .padding-top-6 {
    padding-top: 6rem;
  }

  .border-radius-50 {
    border-radius: 50%;
  }

  .box-shadow-tertiary {
    box-shadow: 0 0 0 4px var(--tertiary-color);
  }

  .object-fit-cover {
    object-fit: cover;
  }

  .height-50vw {
    height: 50vw;
  }

  .width-50vw {
    width: 50vw;
  }

  .height-16 {
    height: 16rem;
  }

  .width-16 {
    width: 16rem;
  }

  .max-height-16 {
    max-height: 16rem;
  }

  .max-width-16 {
    max-width: 16rem;
  }

  .min-width-25vw {
    min-width: 25vw;
  }

  .padding-horizontal-1 {
    padding: 0 1rem;
  }

  .block {
    display: block;
  }

  .relative {
    position: relative;
  }

  .z-index-1 {
    z-index: 1;
  }

  .button {
    background: var(--button-background-color);
    border: 1px solid var(--button-background-color);
    border-radius: 0.375rem;
    color: var(--button-color);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.875rem;
    font-weight: 500;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    text-decoration: none;
    transition: all 0.15s ease-in-out;
  }

  .button:hover {
    color: var(--button-hover-color);
    background: var(--button-hover-background-color);
    border-color: var(--button-hover-background-color);
    text-decoration: none;
  }

  .button-primary {
    background: var(--button-background-color);
    border-color: var(--button-background-color);
    color: var(--button-color);
  }

  .button-primary:hover {
    color: var(--button-hover-color);
    background: var(--button-hover-background-color);
    border-color: var(--button-hover-background-color);
  }

  .button:focus-visible {
    outline: 2px solid var(--button-background-color);
    outline-offset: 3px;
  }

  /* Responsive utility classes */
  .mobile {
    display: block;
  }

  .tablet {
    display: none;
  }

  .desktop {
    display: none;
  }

  /* Show tablet and desktop content starting at 64rem (1024px) */
  @media (min-width: 64rem) {
    .mobile {
      display: none;
    }

    .tablet {
      display: block;
    }

    .desktop {
      display: block;
    }
  }

  /* For very large screens 120rem+ (1920px+), we can add additional classes if needed */
  .desktop-large {
    display: none;
  }

  @media (min-width: 120rem) {
    .desktop-large {
      display: block;
    }
  }
`;
