import { Base } from "@components/base";
import "@components/icon";
import { close } from "@icons/close";
import { menu } from "@icons/menu";
import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { style } from "./index.css";

@customElement("navigation-mobile")
export class NavigationMobile extends Base {
  @property({ type: Boolean, reflect: true }) accessor opened = false;

  static styles = [...super.styles, style];

  scrollY = 0;

  close() {
    this.opened = false;
  }

  open() {
    this.opened = true;
  }

  toggle() {
    this.opened = !this.opened;
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
      <icon-component @click=${this.toggle}>${menu}</icon-component>
      <aside>
        <icon-component @click=${this.toggle}>${close}</icon-component>
        <slot name="aside"></slot>
      </aside>
    `;
  }
}
