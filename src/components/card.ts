import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { globalStyles } from "../styles/global";

@customElement("card-component")
class CardComponent extends LitElement {
  @property({ type: String }) accessor image = "";
  @property({ type: String }) accessor title = "";
  @property({ type: String }) accessor content = "";

  static styles = [
    globalStyles,
    css`
      :host {
        /* border: 1px solid var(--color-neutral-600); */
        /* border-radius: 1rem; */
        display: flex;
        flex-direction: column;
        /* gap: 1rem; */
        /* padding: 1rem; */
      }

      #bottom {
        background-color: var(--color-neutral-800);
        border-radius: 0 0 0.5rem 0.5rem;
        padding: 0.5rem 1rem;
      }

      #top {
        background-color: var(--color-neutral-800);
        border-radius: 0.5rem 0.5rem 0 0;
        display:flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 1rem;
      }

      img {
        width: 100%;
      }
    `,
  ];

  render() {
    return html`
      <div id="top">
        <h2 id="title">${this.title}</h2>
        <slot name="chips"></slot>
      </div>
      <div id="center"></div>
      <img src="${this.image}" alt="${this.title}" />
      <div id="bottom">
        <slot name="content"></slot>
      </div>
    `;
  }
}
