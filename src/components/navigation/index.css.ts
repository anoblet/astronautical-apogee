import { css } from "lit";

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

  fluent-menu {
    height: 100%;

    [slot="trigger"] {
      align-items: center;
      display: flex;
      height: 100%;
    }
  }

  fluent-menu-list {
    background-color: var(--color-neutral-900);
  }

  fluent-menu-item {
    color: var(--color-neutral-200);

    a {
      padding: 0;
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
