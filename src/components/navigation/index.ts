import { Base } from "@components/base";
import "@fluentui/web-components/button.js";
import "@fluentui/web-components/link.js";
import "@fluentui/web-components/menu-button.js";
import "@fluentui/web-components/menu-item.js";
import "@fluentui/web-components/menu-list.js";
import "@fluentui/web-components/menu.js";
import { home } from "@icons/home";
import { globalStyles } from "@styles/global";
import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { style } from "./index.css";

@customElement("navigation-component")
export class NavigationComponent extends Base {
  @property({ type: Boolean, reflect: true }) accessor opened = false;

  static styles = [globalStyles, style];

  scrollY = 0;

  close() {
    this.opened = false;
  }

  firstUpdated() {
    super.firstUpdated();

    window.addEventListener("scroll", () => {
      console.log("Scroll", window.scrollY);

      if (window.scrollY > 0) {
        // this.style.position = "fixed";
      } else {
        // this.style.position = "";
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

  mouseleave(e: any) {
    e.target.closeMenu();
  }

  navigate(e: any) {
    e.preventDefault();
    const target = e.currentTarget as HTMLAnchorElement;
    const href = target.getAttribute("href");
    if (href) {
      window.location.href = href;
    }
  }

  render() {
    return html`
      <a class="teal-200" href="/" id="home">
        <icon-component>${home}</icon-component>
      </a>
      <ul class="overflow-x">
        <li>
          <fluent-menu
            @mouseleave=${this.mouseleave}
            close-on-scroll
            open-on-hover
          >
            <div slot="trigger">
              <fluent-menu-button appearance="stealth">
                <a href="/portfolio">Portfolio</a>
              </fluent-menu-button>
            </div>
            <fluent-menu-list>
              <fluent-menu-item
                @click=${this.navigate}
                href="/portfolio/personal"
              >
                <a href="/portfolio/personal">Personal</a>
              </fluent-menu-item>
              <fluent-menu-item
                @click=${this.navigate}
                href="/portfolio/professional"
              >
                <a href="/portfolio/professional">Professional</a>
              </fluent-menu-item>
            </fluent-menu-list>
          </fluent-menu>
        </li>
        <li>
          <fluent-menu
            @mouseleave=${this.mouseleave}
            close-on-scroll
            open-on-hover
          >
            <div slot="trigger">
              <fluent-menu-button appearance="stealth">
                <a href="/services">Services</a>
              </fluent-menu-button>
            </div>
            <fluent-menu-list>
              <fluent-menu-item @click=${this.navigate} href="/services/design">
                <a href="/services/design">Design</a>
              </fluent-menu-item>
              <fluent-menu-item
                @click=${this.navigate}
                href="/services/hosting"
              >
                <a href="/services/hosting">Hosting</a>
              </fluent-menu-item>
              <fluent-menu-item
                @click=${this.navigate}
                href="/services/consultation"
              >
                <a href="/services/consultation">Consultation</a>
              </fluent-menu-item>
            </fluent-menu-list>
          </fluent-menu>
        </li>
        <!-- <li><a href="/blog">Blog</a></li> -->
        <li><a href="/mentorship">Mentorship</a></li>
      </ul>

      <div id="social">
        <social-component></social-component>
      </div>
    `;
  }
}
