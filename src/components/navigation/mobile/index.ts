import { Base } from "@components/base";
import "@components/contrast";
import "@components/icon";
import { close } from "@icons/close";
import { menu } from "@icons/menu";
import { planet } from "@icons/planet";
import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { style } from "./index.css";

@customElement("navigation-mobile")
export class NavigationMobile extends Base {
  @property({ type: Boolean, reflect: true }) accessor opened = false;

  static styles = [...super.styles, style];

  scrollY = 0;

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
      <div class="space-between">
        <icon-component @click=${this.toggle}>${menu}</icon-component>
        <icon-component href="/">${planet}</icon-component>
        <contrast-component></contrast-component>
      </div>
      <aside>
        <icon-component @click=${this.toggle}>${close}</icon-component>
        <slot name="aside"></slot>
      </aside>
    `;
  }
}
