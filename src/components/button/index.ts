import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Base } from '../base';

@customElement('button-component')
export class ButtonComponent extends Base {
  @property({ type: String }) accessor href = '';
  @property({ type: String }) accessor variant: 'primary' | 'secondary' =
    'primary';

  static styles = [
    ...super.styles,
    css`
      :host {
        align-items: center;
        background-color: var(--button-background-color);
        border: none;
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
        color: var(--button-color);
        cursor: pointer;
        font-size: 1.25rem;
        font-weight: 600;
        gap: 1rem;
        justify-content: center;
        letter-spacing: 0.1rem;
        outline: var(--button-outline);
        padding: 1rem 2rem;
        text-align: center;
        transition:
          background-color 0.2s ease,
          outline-color 0.2s ease;
      }

      :host(:hover) {
        background-color: var(--button-hover-background-color);
        color: var(--button-hover-color);
      }

      :host([variant='primary']) {
        outline: 1px solid var(--color-neutral-800);
      }

      :host([variant='secondary']) {
        background: unset;
        color: var(--button-secondary-color);
        outline: 1px solid var(--button-background-color);
      }

      :host([variant='secondary']:hover) {
        background-color: var(--button-hover-background-color);
        color: var(--button-hover-color);
        outline: 1px solid var(--button-hover-background-color);
      }

      ::slotted(span) {
        line-height: 0;
      }

      ::slotted(svg) {
        fill: currentColor;
      }
    `,
  ];

  render() {
    return html`<slot></slot>`;
  }
}
