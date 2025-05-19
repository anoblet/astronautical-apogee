import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { globalStyles } from "../../styles/global";
import { style } from "./index.css";
import { close } from "../../icons/close";
import { menu } from "../../icons/menu";

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
      <slot></slot>
      <aside>
        <span @click=${this.close} class="icon" id="close">${close}</span
        ><slot name="aside"></slot>
      </aside>
    `;
  }
}
