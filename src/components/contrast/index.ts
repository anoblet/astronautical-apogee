import { Base } from "@components/base";
import "@components/icon";
import { contrast } from "@icons/contrast";
import { light } from "@themes/light";
import { html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("contrast-component")
export class ContrastComponent extends Base {
  render() {
    return html`<icon-component>${contrast}</icon-component>`;
  }
}

if (light.styleSheet) {
  document.adoptedStyleSheets = [
    ...document.adoptedStyleSheets,
    light.styleSheet,
  ];
} else {
  console.error("Global styles not loaded");
}
