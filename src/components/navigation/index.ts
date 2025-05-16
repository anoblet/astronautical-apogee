import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { globalStyles } from "../../styles/global";
import { style } from "./navigation.css";

@customElement("navigation-component")
export class NavigationComponent extends LitElement {
  static styles = [
    globalStyles,
    style
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
