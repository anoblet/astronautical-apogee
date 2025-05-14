import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { globalStyles } from "../../styles/global";

@customElement("button-component")
export class ButtonComponent extends LitElement {
  @property({ type: String }) accessor href = "";
  @property({ type: String }) accessor variant: "primary" | "secondary" =
    "primary";

  static styles = [
    globalStyles,
    css`
      :host {
        border-radius: var(--border-radius);
        color: var(--color-neutral-900);
        padding: 1rem 2rem;
        border: none;
        cursor: pointer;
        transition: background-color 0.2s ease, color 0.2s ease;
        font-size: 1.25rem;
        font-weight: 600;
        letter-spacing: 0.1rem;
      }

      a {
        text-decoration: none;
        color: inherit;
      }

      button {
        display: flex;
        flex: 1;
      }

      :host([variant="primary"]) {
        background: var(--color-teal-200);
        color: var(--color-neutral-900);

        &:hover {
          background-color: var(--color-rose-400);
          color: var(--color-neutral-900);
        }
      }

      :host([variant="primary"]:hover) {
        background-color: var(--color-rose-400);
        color: var(--color-neutral-900);
      }
      :host([variant="secondary"]) {
        background: var(--color-neutral-900);
        color: var(--color-neutral-100);
      }
      :host([variant="secondary"]:hover) {
        background-color: color-mix(
          in oklab,
          var(--color-teal-200) 20%,
          var(--color-neutral-900) 100%
        );
        color: var(--color-neutral-900);
      }
    `,
  ];

  render() {
    return html`
      ${this.href
        ? html`<a href="${this.href}"><slot></slot></a>`
        : html`<button><slot></slot></button>`}
    `;
  }
}
