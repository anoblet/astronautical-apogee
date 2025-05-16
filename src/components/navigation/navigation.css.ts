import { css } from "lit";

export const style = css`
  :host {
    background-color: var(--color-neutral-900);
    display: flex;
    justify-content: space-between;
    opacity: 1;
    transition: opacity 0.2s ease-in-out;
    width: 100%;
  }

  :host([hidden]) {
    opacity: 0 !important;
    transition: opacity 0.2s ease-in-out;
  }
`;
