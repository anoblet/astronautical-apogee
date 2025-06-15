import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { globalStyles } from '../../styles/global';
import { Base } from '../base';

@customElement('button-component')
export class ButtonComponent extends Base {
  @property({ type: String }) accessor href = '';
  @property({ type: String }) accessor variant: 'primary' | 'secondary' =
    'primary';

  static styles = [
    globalStyles,
    css`
      :host {
        align-items: center;
        border-radius: var(--border-radius);
        color: var(--color-neutral-900);
        gap: 1rem;
        justify-content: center;
        padding: 1rem 2rem;
        border: none;
        cursor: pointer;
        transition:
          background-color 0.2s ease,
          color 0.2s ease;
        font-size: 1.25rem;
        font-weight: 600;
        letter-spacing: 0.1rem;
        text-align: center;
      }

      a {
        text-decoration: none;
        color: inherit;
      }

      button {
        display: flex;
        flex: 1;
      }

      :host([variant='primary']) {
        background: var(--color-teal-200);
        color: var(--color-neutral-800);
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
        border: 1px solid var(--color-teal-200);
        color: var(--color-teal-200);
      }

      :host([variant='secondary']:hover) {
        background-color: color-mix(
          in oklab,
          var(--color-teal-200) 20%,
          var(--color-neutral-900) 100%
        );
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
