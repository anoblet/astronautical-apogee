import { Base } from '@components/base';
import { planet, phone, mail, language } from '@icons/index';
import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('business-card')
export class BusinessCard extends Base {
  @property({ type: String }) accessor side = 'front';

  static styles = [
    ...super.styles,
    css`
      :host {
        --icon-padding: 0;
        --icon-size: 24px;

        background-color: var(--color-neutral-900);
        /* border: 1px solid var(--color-neutral-500); */
        border-radius: 0.5rem;
        height: calc(600px);
        justify-content: center;
        width: calc(1050px);
      }

      ::marker {
        content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='1rem' viewBox='0 -960 960 960' width='1rem' fill='currentColor'%0A%3E%3Cpath d='M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z' /%3E%3C/svg%3E");
      }

      :host([data-theme='dark']) {
        li::marker {
          content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='1rem' viewBox='0 -960 960 960' width='1rem' fill='oklch(0.91 0.096 180.426)'%0A%3E%3Cpath d='M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z' /%3E%3C/svg%3E");
        }
      }

      :host([side='back']) {
        icon-component {
          margin-top: 0.25rem;
        }
      }

      .amber-300 {
        color: var(--color-amber-300);
      }

      .front {
        icon-component {
          --icon-size: calc(50% * (1 / 1.618));
        }
      }

      .sky-200 {
        color: var(--color-sky-200);
      }

      h1 {
        font-size: 5rem;
      }

      li {
        line-height: unset;
      }

      span {
        align-items: center;
        display: flex;
      }

      ul {
        height: max-content;
        padding: 0.5rem;
      }
    `,
  ];

  render() {
    return html`
      ${this.side === 'front'
        ? html`
            <div
              class="align-items-center flex front justify-content-center width-100"
            >
              <icon-component class="width-100">${planet}</icon-component>
            </div>
          `
        : html`
            <div
              class="column flex padding justify-content-space-around width-100"
            >
              <h1 class="font-weight-6 text-align-center">Andrew Noblet</h1>
              <p class="font-size-1-5 text-align-center">
                Empowering your online presence with design, hosting, and expert
                guidance.
              </p>
              <div class="align-items-center flex space-around">
                <ul class="amber-300 font-size-1-5 gap-2 grid">
                  <li>Design</li>
                  <li>Hosting</li>
                  <li>Consultation</li>
                </ul>
                <ul class="amber-300 font-size-1-5 gap-2 grid">
                  <li>Mentorship</li>
                  <li>Workshops</li>
                  <li>Strategy</li>
                </ul>
              </div>
              <div class="flex font-size-1-5 space-around">
                <span class="align-items-center flex gap-0-5">
                  <icon-component>${phone}</icon-component>
                  (914) 417-9070
                </span>
                <span class="align-items-center flex gap-0-5">
                  <icon-component>${mail}</icon-component>
                  andrewbnoblet@gmail.com
                </span>
                <span class="align-items-center flex gap-0-5">
                  <icon-component>${language}</icon-component>
                  andrewnoblet.com
                </span>
              </div>
            </div>
          `}
    `;
  }
}
