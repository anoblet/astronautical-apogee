import { Base } from '@components/base';
import '@components/icon';
import '@components/social';
import { close, menu } from '@icons/index';
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

    if (this.opened) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
    }
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
      <div class="space-between">
        <icon-component @click=${this.toggle}>${menu}</icon-component>
      </div>
      <aside class="column gap flex">
        <icon-component @click=${this.toggle}>${close}</icon-component>
        <div class="flex-1 padding">
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
                  <li>
                    <a href="/services/community-social"
                      >Social Media Management</a
                    >
                  </li>
                </ul>
              </details>
            </li>
            <li><a href="/mentorship">Mentorship</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </div>
        <social-component></social-component>
      </aside>
    `;
  }
}
