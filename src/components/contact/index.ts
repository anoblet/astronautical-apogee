import { css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { calendarMonth } from "../../icons/calendar-month";
import { globalStyles } from "../../styles/global";
import { Base } from "../base";
import "../button";

@customElement("contact-component")
export class ContactComponent extends Base {
  static styles = [
    globalStyles,
    css`
      :host {
        bottom: 1rem;
        position: fixed;
        right: 1rem;
        width: max-content;
      }

      a {
        text-decoration: none;
        color: inherit;
      }

      button-component {
        transition: transform 0.2s var(--ease, ease);
      }
      
      a:hover button-component {
        transform: scale(1.04);
      }
    `,
  ];

  render() {
    return html`
      <a href="${this.href}" target="_blank" rel="noopener noreferrer">
        <button-component variant="primary">
          <span>Schedule</span>${calendarMonth}
        </button-component>
      </a>
    `;
  }
}
