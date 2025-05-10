import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { globalStyles } from "../styles/global";

@customElement("chip-component")
class ChipoCmponent extends LitElement {
  @property({ type: String }) accessor image = "";
  @property({ type: String }) accessor title = "";
  @property({ type: String }) accessor content = "";

  static styles = [
    globalStyles,
    css`
      :host {
        border: 1px solid var(--color-neutral-600);
        border-radius: 0.25rem;
        display: block;
        font-size: 0.875rem;
        padding: 0.125rem 0.5rem;
      }

      :host(:hover) {
        background-color: var(--color-neutral-600);
        cursor: pointer;
      }
    `,
  ];

  render() {
    return html`<slot></slot>`;
  }
}
