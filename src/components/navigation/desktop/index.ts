import { Base } from '@components/base';
import { home } from '@icons/home';
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
      <a href="/" id="home" part="home">
        <icon-component>${home}</icon-component>
      </a>
      <ul class="overflow-x">
        <li>
          <div class="dropdown">
            <a href="/portfolio" class="dropdown-trigger">Portfolio</a>
            <div class="dropdown-menu">
              <a href="/portfolio/personal">Personal</a>
              <a href="/portfolio/professional">Professional</a>
            </div>
          </div>
        </li>
        <li>
          <div class="dropdown">
            <a href="/services" class="dropdown-trigger">Services</a>
            <div class="dropdown-menu">
              <a href="/services/design">Design</a>
              <a href="/services/hosting">Hosting</a>
              <a href="/services/consultation">Consultation</a>
            </div>
          </div>
        </li>
        <li><a href="/mentorship">Mentorship</a></li>
      </ul>

      <div id="social">
        <social-component></social-component>
      </div>
    `;
  }
}
