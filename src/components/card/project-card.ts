import { css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { globalStyles } from "../../styles/global";
import { CardComponent } from "./card";

@customElement("project-card")
export class ProjectCard extends CardComponent {
  @property({ type: String }) accessor image = "";
  @property({ type: String }) accessor title = "";
  @property({ type: String }) accessor content = "";

  static styles = [
    ...super.styles,
    css`
      #bottom {
        border-radius: 0 0 0.25rem 0.25rem;
        padding: 0.5rem 1rem;
      }

      #top {
        border-radius: 0.25rem 0.25rem 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
      }

      img {
        width: 100%;
      }
    `,
  ];

  render() {
    return html`
      <div id="top">
        <slot name="top">
          <h2 id="title" part="title">${this.title}</h2>
          <slot name="chips"></slot>
        </slot>
      </div>
      <div id="center">
        <img src="${this.image}" alt="${this.title}" />
        <slot name="content"></slot>
      </div>
      <div id="bottom"></div>
    `;
  }
}
