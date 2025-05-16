import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { globalStyles } from "../styles/global";

@customElement("navigation-component")
export class NavigationComponent extends LitElement {
  static styles = [
    globalStyles,
    css`
      :host {
        background-color: var(--color-neutral-900);
        flex-direction: column;
        opacity: 1;
        transition: opacity 0.2s ease-in-out;
        width: 100%;
      }

      :host([hidden]) {
        opacity: 0 !important;
        transition: opacity 0.2s ease-in-out;
      }
    `,
  ];

  scrollY = 0;

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
    return html`<slot></slot>`;
  }
}
