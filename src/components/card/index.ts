import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Base } from '../base';

@customElement('card-component')
export class CardComponent extends Base {
  @property({ type: String }) accessor title = '';
  @property({ type: String }) accessor content = '';

  accessor classes = [...super.classes, 'card'];

  static styles = [
    ...super.styles,
    css`
      :host {
        background-color: var(--card-background-color);
        border-radius: 0.5rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        border: 1px solid var(--card-border-color);
        box-shadow:
          0 10px 15px -3px rgb(0 0 0 / 0.2),
          0 4px 6px -4px rgb(0 0 0 / 0.1);
        transition: outline-color 0.1s ease-in-out;
        /* transition: transform 0.2s ease-in-out; */
        width: 100%;
      }

      :host(:hover) {
        /* background-color: var(--color-neutral-700); */
        outline-color: var(--color-neutral-400);
        /* transform: scale(1.02); */
        transition: outline-color 0.1s ease-in-out;
        /* transition: transform 0.2s ease-in-out; */
      }

      #center {
        flex: 1;
      }
    `,
  ];

  render() {
    return html`<slot></slot>`;
  }
}

console.log('CardComponent loaded');
