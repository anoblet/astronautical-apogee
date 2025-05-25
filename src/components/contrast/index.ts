import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { Base } from "@components/base";
import { contrast } from "@icons/contrast";
import "@components/icon";

@customElement("contrast-component")
export class ContrastComponent extends Base {
  render() {
    return html`<icon-component>${contrast}</icon-component>`;
  }
}
