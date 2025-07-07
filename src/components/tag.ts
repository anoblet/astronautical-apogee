import { Base } from '@components/base';
import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('tag-component')
export class TagComponent extends Base {
  static styles = [
    ...super.styles,
    css`
      :host {
        border: 1px solid var(--primary-color);
        border-radius: 0.25rem;
        cursor: pointer;
        display: block;
        font-size: 0.875rem;
        padding: 0.125rem 0.75rem;
      }

      :host(:hover) {
        background-color: var(--button-background-color);
        color: var(--button-color);
        transition: background-color 0.1s ease-in-out;
      }
    `,
  ];

  render() {
    return html`<slot></slot>`;
  }
}
