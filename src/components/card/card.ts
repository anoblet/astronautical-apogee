import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { globalStyles } from "../../styles/global";

@customElement("card-component")
export class CardComponent extends LitElement {
  @property({ type: String }) accessor title = "";
  @property({ type: String }) accessor content = "";

  static styles = [
    globalStyles,
    css`
      :host {
        background-color: var(--color-neutral-800);
        border-radius: 0.5rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.2),
          0 4px 6px -4px rgb(0 0 0 / 0.1);
        outline: 1px solid var(--color-neutral-600);
        transition: transform 0.2s ease-in-out;
      }

      :host(:hover) {
        /* outline: 1px solid var(--color-teal-200); */
        /* transform: scale(1.02); */
        transition: transform 0.2s ease-in-out;
      }

      #title {
        color: var(--color-teal-200);
      }
    `,
  ];

  render() {
    return html`
      <h2 id="title" part="title">${this.title}</h2>
      <slot name="content"></slot>
    `;
  }
}
