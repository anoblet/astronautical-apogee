import "@components/button";
import { calendarMonth } from "@icons/calendar-month";
import { phone } from "@icons/phone";
import { css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { Base } from "../base";

@customElement("contact-component")
export class ContactComponent extends Base {
  static styles = [
    ...super.styles,
    css`
      :host {
        background-color: var(--color-teal-200);
        border-radius: 50%;
        bottom: 1rem;
        box-shadow: var(--box-shadow);
        color: var(--color-neutral-900);
        outline: 1px solid #000;
        position: fixed;
        right: 1rem;
        width: max-content;
      }

      a:hover button-component {
        transform: scale(1.04);
      }
    `,
  ];

  render() {
    return html`
      <a
        class="padding"
        href="${this.href}"
        target="_blank"
        rel="noopener noreferrer"
      >
        ${phone}
      </a>
    `;
  }
}
