import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { globalStyles } from "../styles/global";

@customElement("chip-component")
class ChipoCmponent extends LitElement {
  @property({ type: String }) accessor image = "";

  static styles = [globalStyles, css``];

  firstUpdate() {
    this.addEventListener("scroll", (e) => {
      const target = e.target as HTMLElement;
      const { scrollLeft, scrollWidth } = target;
    });
  }

  render() {
    return html`<div id="container"><slot></slot></div>`;
  }
}
