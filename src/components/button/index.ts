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
          color 0.2s ease;
      }

      :host([variant='primary']) {
        outline: 1px solid var(--color-neutral-800);

        &:hover {
          background-color: var(--color-rose-400);
          color: var(--color-neutral-800);
        }
      }

      :host([variant='primary']:hover) {
        background-color: var(--color-rose-400);
        color: var(--color-neutral-800);

        a {
          color: inherit;
        }
      }

      :host([variant='secondary']) {
        background: unset;
        border: var(--button-secondary-border);
        color: var(--button-secondary-color);
      }

      :host([variant='secondary']:hover) {
        background-color: color-mix(
          in oklab,
          var(--color-teal-200) 20%,
          var(--color-neutral-900) 100%
        );
        color: var(--button-secondary-hover-color);
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
