import { css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { arrowForward } from "../../icons/arrow-forward";
import "../image";
import { CardComponent } from ".";

@customElement("project-card")
export class ProjectCard extends CardComponent {
  @property({ type: String }) accessor image = "";
  @property({ type: String }) accessor title = "";
  @property({ type: String }) accessor content = "";

  static styles = [
    ...super.styles,
    css`
      #bottom {
        color: var(--color-teal-200);
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-weight: 800;
        gap: 0.5rem;
      }

      #top {
        border-radius: 0.25rem 0.25rem 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
      }

      a {
        align-items: center;
        text-decoration: none;
        color: var(--color-teal-200);
        display: flex;
      }

      img {
        width: 100%;
      }

      svg {
        fill: var(--color-teal-200);
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
        <image-component
          src="${this.image}"
          alt="${this.title}"
        ></image-component>
        <slot name="content"></slot>
      </div>
      <div id="bottom">
        Learn more
        <a href="#" id="action" part="action">${unsafeHTML(arrowForward)}</a>
      </div>
    `;
  }
}
