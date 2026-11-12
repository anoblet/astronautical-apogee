import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Base } from '../base';

@customElement('button-component')
export class ButtonComponent extends Base {
  @property({ type: String }) accessor variant: 'primary' | 'secondary' =
    'primary';
  static styles = [
    ...super.styles,
    css`
      :host {
        display: inline-flex;
      }
      a,
      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        padding: 1rem 1.5rem;
        font: inherit;
        font-weight: 600;
        cursor: pointer;
        border-radius: 0.25rem;
        border: 1px solid var(--button-background-color);
        background: var(--button-background-color);
        color: var(--button-color);
        text-align: center;
      }
      :host([variant='secondary']) a,
      :host([variant='secondary']) button {
        background: transparent;
        color: var(--button-secondary-color);
      }
      a:hover,
      button:hover {
        background: var(--button-hover-background-color);
        color: var(--button-hover-color);
      }
      ::slotted(svg) {
        fill: currentColor;
        width: 1.25rem;
      }
    `,
  ];
  render() {
    return this.href
      ? html`<a href=${this.href}><slot></slot></a>`
      : html`<button type="button"><slot></slot></button>`;
  }
}
