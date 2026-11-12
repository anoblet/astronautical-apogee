import { css } from 'lit';

export const style = css`
  :host {
    --a-color: var(--navigation-a-color);
    --a-hover-color: var(--navigation-a-hover-color);

    --icon-color: var(--navigation-icon-color);
    --icon-hover-color: var(--navigation-icon-hover-color);

    background-color: var(--navigation-background-color);
    box-shadow: var(--box-shadow);
    display: flex;
    flex: 1;
    justify-content: space-between;
    opacity: 1;
    position: fixed;
    top: 0;
    left: 0;
    transition:
      opacity 0.4s ease-in-out,
      transform 0.3s ease-in-out;

    width: 100%;
    z-index: 1000;
  }

  :host([hidden]) {
    opacity: 0;
    transform: translateY(-100%);
    transition:
      opacity 0.4s ease-in-out,
      transform 0.3s ease-in-out;
  }

  #home {
    --icon-size: 1.5rem;
  }

  a {
    font-weight: 500;
  }

  icon-component {
    padding: 0.5rem 1rem;
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
      height: 100%;
      display: flex;
      align-items: center;
      flex: 1;
    }
  }

  .dropdown {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    flex: 1;

    .dropdown-trigger {
      padding: 0 1rem;
      height: 100%;
      display: flex;
      align-items: center;
      flex: 1;
    }

    .dropdown-menu {
      background-color: var(--navigation-background-color);
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

  ul {
    align-items: center;
    display: flex;
    flex: 1;
    gap: 1rem;
    list-style: none;
    padding: 0 1rem;
  }
`;
