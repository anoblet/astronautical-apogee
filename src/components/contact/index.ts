import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { calendarMonth } from "../../icons/calendar-month";
import { globalStyles } from "../../styles/global";
import "../button/button";

@customElement("contact-component")
export class ContactComponent extends LitElement {
  static styles = [
    globalStyles,
    css`
      :host {
        bottom: 1rem;
        position: fixed;
        right: 1rem;
        width: max-content;
      }
      button-component {
        transition: transform 0.2s var(--ease, ease);
      }
      button-component:hover {
        transform: scale(1.04);
      }
    `,
  ];

  render() {
    return html`
      <button-component
        href="https://calendar.app.google/t9p2HfknyNWf1RNV6"
        variant="primary"
      >
        <span>Schedule</span>${calendarMonth}
      </button-component>
    `;
  }
}
