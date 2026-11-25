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
        display: grid;
        width: 100%;
        overflow-wrap: anywhere;
        background: var(--color-neutral-900);
        border: 1px solid var(--color-neutral-600);
        border-radius: 0.5rem;
        color: var(--color-neutral-200);
      }
      :host([export]) {
        width: 1050px;
        height: 600px;
      }
      .front {
        display: grid;
        place-items: center;
        min-height: clamp(10rem, 25vw, 20rem);
      }
      .front svg {
        width: clamp(4rem, 18vw, 13rem);
        height: auto;
      }
      .back {
        display: grid;
        align-content: center;
        gap: 1.5rem;
        padding: clamp(1rem, 5vw, 3rem);
        text-align: center;
      }
      .name {
        font-size: clamp(1.5rem, 5vw, 3.5rem);
        line-height: 1.1;
        font-weight: 600;
      }
      ul {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 8rem), 1fr));
        gap: 0.5rem;
        padding: 0;
        list-style: none;
        color: var(--color-amber-300);
      }
      li {
        padding: 0;
      }
      li::marker {
        content: '';
      }
      .contact {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.75rem 1.5rem;
      }
      .contact span {
        display: inline-flex;
        gap: 0.4rem;
        align-items: center;
      }
      .contact svg {
        flex: none;
      }
    `,
  ];

  render() {
    return this.side === 'front'
      ? html`<div class="front" aria-hidden="true">${planet}</div>`
      : html`<div class="back">
          <p class="name">Andrew Noblet</p>
          <p>Website design, hosting, and technical guidance.</p>
          <ul>
            <li>Design</li>
            <li>Hosting</li>
            <li>Consultation</li>
            <li>Mentorship</li>
            <li>Tutoring</li>
            <li>Social media support</li>
          </ul>
          <div class="contact">
            <span>${phone} (914) 417-9070</span>
            <span>${mail} andrewbnoblet@gmail.com</span>
            <span>${language} andrewnoblet.com</span>
          </div>
        </div>`;
  }
}
