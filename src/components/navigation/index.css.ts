import { css } from 'lit';

export const style = css`
  :host {
    background-color: var(--color-neutral-900);
    display: flex;
    flex: 1;
    justify-content: space-between;
    opacity: 1;
    transition: opacity 0.2s ease-in-out;
    width: 100%;
    z-index: 1;
  }

  :host([hidden]) {
    opacity: 0 !important;
    transition: opacity 0.2s ease-in-out;
  }

  #home {
    &:hover {
      color: var(--color-rose-400);
    }
  }

  a {
    color: var(--navigation-a-color);
  }

  li {
    align-items: center;
    display: flex;
    height: 100%;

    &:hover {
      cursor: pointer;
    }

    a {
      padding: 0 1rem;
    }
  }

  .dropdown {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;

    .dropdown-trigger {
      padding: 0 1rem;
      height: 100%;
      display: flex;
      align-items: center;
    }

    .dropdown-menu {
      position: absolute;
      top: 100%;
      left: 0;
      background-color: var(--color-neutral-900);
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
      border-radius: 0.5rem;
      min-width: 180px;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      transition: all 0.2s ease-in-out;
      z-index: 10;

      a {
        display: block;
        padding: 0.75rem 1rem;
        color: var(--color-neutral-200);
        transition: background-color 0.2s ease-in-out;

        &:hover {
          background-color: var(--color-neutral-800);
        }

        &:first-child {
          border-radius: 0.5rem 0.5rem 0 0;
        }

        &:last-child {
          border-radius: 0 0 0.5rem 0.5rem;
        }
      }
    }

    &:hover .dropdown-menu {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
  }

  social-component {
    color: var(--color-teal-200);
  }

  svg {
    height: 1.75rem;
    width: 1.75rem;
  }

  ul {
    align-items: center;
    display: flex;
    flex: 1;
    gap: 1rem;
    list-style: none;
    padding: 0 1rem;
  }
`;
