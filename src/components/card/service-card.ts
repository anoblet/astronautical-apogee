import { css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { arrowForward } from "../../icons/arrow-forward";
import { CardComponent } from "./card";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

@customElement("service-card")
export class ServiceCard extends CardComponent {
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

      #center {
        padding: 1rem 0;
      }

      #top {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      a {
        align-items: center;
        text-decoration: none;
        color: var(--color-teal-200);
        display: flex;
      }

      svg {
        fill: var(--color-teal-200);
      }
    `,
  ];

  render() {
    return html`
      <div id="top">
        <h2 id="title" part="title">${this.title}</h2>
        <!-- <a href="#" id="action" part="action">${unsafeHTML(
          arrowForward
        )}</a> -->
      </div>
      <div id="center">
        <slot name="content"></slot>
      </div>
      <div id="bottom">
        Learn more
        <a href="#" id="action" part="action">${unsafeHTML(arrowForward)}</a>
      </div>
    `;
  }
}
