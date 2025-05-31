import { home } from "@icons/home";
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { globalStyles } from "../../styles/global";
import { style } from "./index.css";

@customElement("navigation-component")
export class NavigationComponent extends LitElement {
  @property({ type: Boolean, reflect: true }) accessor opened = false;

  static styles = [globalStyles, style];

  scrollY = 0;

  close() {
    this.opened = false;
  }

  firstUpdated() {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        this.style.position = "fixed";
      } else {
        this.style.position = "";
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
      <a href="/">
        <icon-component>${home}</icon-component>
      </a>
      <ul class="overflow-x padding-0">
        <li><a href="/portfolio">Portfolio</a></li>
        <li><a href="/software">Software</a></li>
        <li><a href="/services">Services</a></li>
        <!-- <li><a href="/blog">Blog</a></li> -->
      </ul>

      <div id="social">
        <social-component></social-component>
      </div>
    `;
  }
}
