import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { globalStyles } from "../../styles/global.ts";

@customElement("icon-component")
export class Icon extends LitElement {
  static styles = [globalStyles, css``];

  render() {
    return html``;
  }
}
