import { css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Base } from "../base";

@customElement("card-component")
export class CardComponent extends Base {
  @property({ type: String }) accessor title = "";
  @property({ type: String }) accessor content = "";

  accessor classes = [...super.classes, "card"];

  static styles = [
    ...super.styles,
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
        /* outline: 1px solid var(--color-neutral-600); */
        outline-width: 1px;
        outline-style: solid;
        outline-color: var(--color-neutral-600);
        transition: outline-color 0.2s ease-in-out;
        /* transition: transform 0.2s ease-in-out; */
      }

      :host(:hover) {
        /* background-color: var(--color-neutral-700); */
        outline-color: var(--color-neutral-500);
        /* transform: scale(1.02); */
        transition: outline-color 0.2s ease-in-out;
        /* transition: transform 0.2s ease-in-out; */
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
