import { Base } from "@components/base";
import { css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("tag-component")
class TagComponent extends Base {
  static styles = [
    ...super.styles,
    css`
      :host {
        border: 1px solid var(--color-blue-200);
        border-radius: 0.25rem;
        color: var(--color-blue-200);
        display: block;
        font-size: 0.875rem;
        padding: 0.125rem 0.5rem;
      }

      :host(:hover) {
        background-color: var(--color-neutral-600);
        cursor: pointer;
        transition: background-color 0.1s ease-in-out;
      }
    `,
  ];

  render() {
    return html`<slot></slot>`;
  }
}

