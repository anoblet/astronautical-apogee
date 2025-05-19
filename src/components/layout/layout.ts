import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { globalStyles } from "../../styles/global.ts";

@customElement("layout-component")
export class Layout extends LitElement {
  static styles = [globalStyles, css``];

  render() {
    return html`<slot></slot>`;
  }
}
