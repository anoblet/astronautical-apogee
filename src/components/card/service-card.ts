import { css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { arrowForward } from "../../icons/arrow-forward";
import { CardComponent } from ".";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

@customElement("service-card")
export class ServiceCard extends CardComponent {
  static styles = [
    ...super.styles,
    css`
      :host {
        transition: transform 0.2s ease-in-out, outline-color 0.2s ease-in-out;
      }

      :host(:hover) {
        transform: translateY(-4px);
      }

      #bottom {
        color: var(--color-teal-200);
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-weight: 600;
        gap: 0.5rem;
        margin-top: auto;
        transition: color 0.2s ease-in-out;
      }

      #center {
        padding: 1rem 0;
        flex: 1;
        display: flex;
        flex-direction: column;
      }

      #top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
      }

      #title {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--color-teal-200);
        margin: 0;
      }

      a {
        align-items: center;
        text-decoration: none;
        color: inherit;
        display: flex;
        transition: transform 0.2s ease-in-out;
      }

      a:hover {
        transform: translateX(4px);
      }

      svg {
        fill: currentColor;
        width: 1.125rem;
        height: 1.125rem;
      }

      :host(:hover) #bottom {
        color: var(--color-teal-100);
      }
    `,
  ];

  render() {
    return html`
      <div id="top">
        <h2 id="title" part="title">${this.title}</h2>
      </div>
      <div id="center">
        <slot name="content"></slot>
      </div>
      <div id="bottom">
        Learn more
        <a href="${this.href}" id="action" part="action">${unsafeHTML(arrowForward)}</a>
      </div>
    `;
  }
}
