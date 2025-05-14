import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { globalStyles } from "../../styles/global";

@customElement("button-component")
export class ButtonComponent extends LitElement {
    @property({ type: String }) accessor variant: "primary" | "secondary" = "primary";

  static styles = [
    globalStyles,
    css`
      button {
        border-radius: var(--border-radius);
        color: var(--color-neutral-900);
        padding: 1rem 2rem;
        border: none;
        cursor: pointer;
        transition:
          background-color 0.2s ease,
          color 0.2s ease;
        font-size: 1.25rem;
        font-weight: 600;
        letter-spacing: 0.1rem;
      }
      .primary {
        background: var(--color-teal-200);
      }
      .primary:hover {
        background-color: color-mix(
          in oklab,
          var(--color-rose-400) 100%,
          var(--color-neutral-900) 20%
        );
        color: var(--color-neutral-900);
      }
      .secondary {
        background: unset;
        border: 1px solid var(--color-teal-200);
        color: var(--color-teal-200);
      }
      .secondary:hover {
        background-color: color-mix(
          in oklab,
          var(--color-teal-200) 20%,
          var(--color-neutral-900) 100%
        );
      }
    `,
  ];

  render() {
    return html`
      <button class="${this.variant}"><slot></slot></button>
    `;
  }
}
