import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { globalStyles } from "../styles/global";

@customElement("chip-component")
class Chipomponent extends LitElement {
  @property({ type: String }) accessor image = "";
  @property({ type: String }) accessor title = "";
  @property({ type: String }) accessor content = "";

  static styles = [
    globalStyles,
    css`
      :host {
        border: 1px solid var(--color-neutral-600);
        border-radius: 0.25rem;
        font-size: 0.875rem;
        padding: 0.125rem 0.5rem;
      }
    `,
  ];

  render() {
    return html`<slot></slot>`;
  }
}
