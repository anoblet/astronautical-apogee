import { css } from 'lit';

export const style = css`
  :host {
    background-color: var(--navigation-background-color);
    box-shadow: var(--box-shadow);
    display: flex;
    justify-content: space-between;
    align-items: center;
    opacity: 1;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    transition:
      opacity 0.4s ease-in-out,
      transform 0.3s ease-in-out;
  }

  :host([hidden]) {
    opacity: 0;
    transform: translateY(-100%);
  }

  /* Home link */
  .home-link {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    color: var(--navigation-icon-color);

    icon-component {
      --icon-size: 1.5rem;
    }
  }

  /* Main navigation menu */
  .nav-menu {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
    padding: 0 1rem;
  }

  /* Navigation links */
  .nav-link {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 1rem;
    color: var(--navigation-a-color);
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s ease-in-out;
  }

  .nav-link:hover {
    color: var(--navigation-a-hover-color);
  }

  /* Dropdown styles */
  .dropdown {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .dropdown-trigger {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 1rem;
    color: var(--navigation-a-color);
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s ease-in-out;
  }

  .dropdown-trigger:hover {
    color: var(--navigation-a-hover-color);
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
  }

  .dropdown-menu a {
    display: block;
    padding: 0.75rem 1rem;
    color: var(--navigation-a-color);
    text-decoration: none;
    transition:
      background-color 0.2s ease-in-out,
      color 0.2s ease-in-out;
  }

  .dropdown-menu a:hover {
    background-color: var(--navigation-a-hover-color);
    color: var(--navigation-background-color);
  }

  .dropdown-menu a:last-child {
    border-radius: 0 0 0.25rem 0.25rem;
  }

  .dropdown:hover .dropdown-menu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`;
