import { Base } from "@components/base";
import { css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("scroll-component")
export class ScrollComponent extends Base {
  static styles = [
    ...super.styles,
    css`
      :host {
        overflow-x: auto;
      }
    `,
  ];

  render() {
    return html`<slot></slot>`;
  }
}
