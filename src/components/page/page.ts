import { Base } from "@components/base";
import "@components/icon";
import { html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("page-component")
export class PageComponent extends Base {
  render() {
    return html`<slot></slot>`;
  }
}
