import { Base } from '@components/base';
import '@components/icon';
import { close } from '@icons/close';
import { menu } from '@icons/menu';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { style } from './index.css';

@customElement('navigation-mobile')
export class NavigationMobile extends Base {
  @property({ type: Boolean, reflect: true }) accessor opened = false;

  static styles = [...super.styles, style];

  scrollY = 0;

  toggle() {
    this.opened = !this.opened;
  }

  firstUpdated() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        this.style.position = 'fixed';
      } else {
        this.style.position = '';
      }

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
      <div class="space-between">
        <icon-component @click=${this.toggle}>${menu}</icon-component>
      </div>
      <aside>
        <icon-component @click=${this.toggle}>${close}</icon-component>
        <ul>
          <li><a href="/">Home</a></li>
          <li>
            <details>
              <summary>Portfolio</summary>
              <ul>
                <li><a href="/portfolio/personal">Personal</a></li>
                <li><a href="/portfolio/professional">Professional</a></li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>Services</summary>
              <ul>
                <li><a href="/services/design">Design</a></li>
                <li><a href="/services/hosting">Hosting</a></li>
                <li><a href="/services/consultation">Consultation</a></li>
              </ul>
            </details>
          </li>
          <li><a href="/mentorship">Mentorship</a></li>
          <li><a href="/blog">Blog</a></li>
        </ul>
      </aside>
    `;
  }
}
