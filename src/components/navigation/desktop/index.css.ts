import { css } from 'lit';

export const style = css`
  :host {
    --a-color: var(--navigation-desktop-a-color);
    --a-hover-color: var(--navigation-desktop-a-hover-color);

    --icon-color: var(--navigation-desktop-icon-color);
    --icon-hover-color: var(--navigation-desktop-icon-hover-color);

    background-color: var(--navigation-desktop-background-color);
    display: flex;
    flex: 1;
    justify-content: space-between;
    opacity: 1;
    transition: opacity 0.2s ease-in-out;
    width: 100%;
    z-index: 1;

    &::part(home) {
      background-color: var(--navigation-desktop-home-background-color);
      color: var(--navigation-desktop-home-color);
    }
  }

  :host([hidden]) {
    opacity: 0 !important;
    transition: opacity 0.2s ease-in-out;
  }

  a {
    color: var(--navigation-a-color);
    font-weight: 500;

    &:hover {
      color: var(--navigation-a-hover-color);
    }
  }

  icon-component {
    padding: 0.5rem 1rem;
  }

  a {
    color: var(--navigation-desktop-a-color);
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
      background-color: var(--navigation-desktop-background-color);
      position: absolute;
      top: 100%;
      left: 0;
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
      border-radius: 0 0 0.5rem 0.5rem;
      min-width: 180px;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      transition: all 0.2s ease-in-out;
      z-index: 10;

      a {
        display: block;
        padding: 0.75rem 1rem;
        transition: background-color 0.2s ease-in-out;

        &:hover {
          background-color: var(--color-neutral-800);
        }

        &:last-child {
          border-radius: 0 0 0.25rem 0.25rem;
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
