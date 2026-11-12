import { css } from 'lit';

export const style = css`
  :host {
    background-color: var(--navigation-background-color);
    box-shadow: var(--box-shadow);
    opacity: 1;
    position: fixed;
    top: 0;
    left: 0;
    transition:
      opacity 0.4s ease-in-out,
      transform 0.3s ease-in-out;
    width: 100%;
    z-index: 1000;

    aside > ul {
      margin: 0 1rem;
    }
  }

  :host([hidden]) {
    opacity: 0;
    transform: translateY(-100%);
    transition:
      opacity 0.4s ease-in-out,
      transform 0.3s ease-in-out;
  }

  :host([opened]) {
    aside {
      left: 0;
      transition: left 0.2s ease-in-out;
    }
  }

  aside {
    background-color: var(--navigation-background-color);
    height: 100vh;
    left: -100vw;
    position: fixed;
    transition: left 0.2s ease-in-out;
    width: 100vw;
    z-index: 1;

    a {
      color: var(--navigation-a-color);

      &:hover {
        color: var(--navigation-a-hover-color);
      }
    }
  }

  details {
    summary {
      cursor: pointer;
      list-style: none;
      font-weight: 500;

      &::marker {
        content: '';
        display: none;
      }

      &:hover {
        color: var(--navigation-a-hover-color);
      }
    }

    &[open] summary::before {
      transform: rotate(90deg);
    }

    ul {
      margin-top: 1rem;
    }
  }

  icon-component {
    color: var(--navigation-icon-color);
    cursor: pointer;
    z-index: 1;
  }

  svg {
    height: 2rem;
    width: 2rem;
  }

  ul {
    display: grid;
    gap: 1rem;
    list-style: none;
    padding: 0 1rem;

    li {
      padding: 0 1rem;
    }
  }

  .title {
    align-items: center;
    color: var(--color-teal-200);
    display: flex;
    flex: 1;
    font-size: 1.25rem;
    font-weight: 600;
    height: 100%;
    justify-content: center;
    padding: 1rem;
    position: absolute;
    width: 100%;
  }
`;
