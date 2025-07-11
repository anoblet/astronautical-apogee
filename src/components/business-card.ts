import { Base } from '@components/base';
import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { planet } from '@icons/planet';

@customElement('business-card')
export class BusinessCard extends Base {
  @property({ type: String }) accessor front = '';
  @property({ type: String }) accessor back = '';

  static styles = [
    ...super.styles,
    css`
      :host {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        width: 100%;
        max-width: 600px;
        aspect-ratio: 2 / 1;
        background: none;
      }
      .card-side {
        position: relative;
        background: var(--card-background-color);
        border-radius: 0.5rem;
        box-shadow: var(--box-shadow);
        border: 1px solid var(--card-border-color);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 2rem;
        overflow: hidden;
        min-height: 300px;
        min-width: 280px;
      }
      .planet-bg {
        position: absolute;
        inset: 0;
        opacity: 0.08;
        pointer-events: none;
        z-index: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .content {
        position: relative;
        z-index: 1;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      @media print {
        :host {
          box-shadow: none;
          border: none;
          background: none;
          width: 100vw;
          max-width: unset;
          aspect-ratio: unset;
          grid-template-columns: 1fr 1fr;
        }
        .card-side {
          box-shadow: none;
          border: 1px solid var(--card-border-color);
          background: var(--card-background-color);
          page-break-inside: avoid;
        }
      }
    `,
  ];

  render() {
    return html`
      <div class="card-side front">
        <div class="planet-bg">${planet}</div>
        <div class="content">
          <slot name="front">${this.front}</slot>
        </div>
      </div>
      <div class="card-side back">
        <div class="planet-bg">${planet}</div>
        <div class="content">
          <slot name="back">${this.back}</slot>
        </div>
      </div>
    `;
  }
}
