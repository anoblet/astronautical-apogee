import '@components/button';
import '@components/icon';
import { calendarMonth } from '@icons/calendar-month';
import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Base } from '../base';

@customElement('contact-component')
export class ContactComponent extends Base {
  static styles = [
    ...super.styles,
    css`
      :host {
        a {
          color: inherit;
        }
      }

      :host(:hover) {
        /* background-color: var(--color-blue-400); */
        transform: scale(1.05);
        transition: transform 0.1s ease-in-out;

        a {
          color: inherit;
        }
      }
    `,
  ];

  render() {
    return html`
      <a
        href="https://calendar.app.google/JjnLtVR6mnM11FcS9"
        target="_blank"
        rel="noopener noreferrer"
      >
        <icon-component>${calendarMonth}</icon-component>
      </a>
    `;
  }
}
