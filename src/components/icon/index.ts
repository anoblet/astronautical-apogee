import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Base } from '@components/base';

@customElement('icon-component')
export class Icon extends Base {
  static styles = [
    ...super.styles,
    css`
      :host {
        color: var(--icon-color);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: var(--icon-padding);
      }

      :host(:hover) {
        color: var(--icon-hover-color);
      }
    `,
  ];

  render() {
    return html`<slot></slot>`;
  }
}
