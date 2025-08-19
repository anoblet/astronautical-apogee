import { Base } from '@components/base';
import { home } from '@icons/index';
import { globalStyles } from '@styles/global';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { style } from './index.css';

@customElement('navigation-desktop')
export class NavigationDesktop extends Base {
  @property({ type: Boolean, reflect: true }) accessor opened = false;

  static styles = [globalStyles, style];

  scrollY = 0;

  close() {
    this.opened = false;
  }

  firstUpdated() {
    super.firstUpdated();

    window.addEventListener('scroll', () => {
      if (this.scrollY > window.scrollY) {
        this.hidden = false;
      }

      if (this.scrollY < window.scrollY) {
        this.hidden = true;
      }

      this.scrollY = window.scrollY;
    });
  }

  render() {
    return html`
      <a href="/" class="home-link" aria-label="Home">
        <icon-component>${home}</icon-component>
      </a>
      <nav class="nav-menu" role="navigation" aria-label="Main navigation">
        <div class="dropdown">
          <a
            href="/portfolio"
            class="dropdown-trigger"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
            aria-controls="portfolio-menu"
            >Portfolio</a
          >
          <div
            class="dropdown-menu"
            id="portfolio-menu"
            role="menu"
            aria-label="Portfolio submenu"
          >
            <a href="/portfolio/personal" role="menuitem">Personal</a>
            <a href="/portfolio/professional" role="menuitem">Professional</a>
          </div>
        </div>
        <div class="dropdown">
          <a
            href="/services"
            class="dropdown-trigger"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
            aria-controls="services-menu"
            >Services</a
          >
          <div
            class="dropdown-menu"
            id="services-menu"
            role="menu"
            aria-label="Services submenu"
          >
            <a href="/services/design" role="menuitem">Design</a>
            <a href="/services/hosting" role="menuitem">Hosting</a>
            <a href="/services/consultation" role="menuitem">Consultation</a>
          </div>
        </div>
        <a href="/mentorship" class="nav-link">Mentorship</a>
        <a href="/blog" class="nav-link">Blog</a>
        <a href="/about" class="nav-link">About</a>
      </nav>
      <social-component></social-component>
    `;
  }
}
