import { Base } from '@components/base';
import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('icon-component')
export class Icon extends Base {
  static styles = [
    ...super.styles,
    css`
      :host {
        background-color: var(--icon-background-color);
        color: var(--icon-color);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: var(--icon-padding);
      }

      :host(:hover) {
        color: var(--icon-hover-color);
      }

      ::slotted(svg) {
        height: var(--icon-size, 1rem);
        width: var(--icon-size, 1rem);
      }
    `,
  ];

  render() {
    return html`<slot></slot>`;
  }
}
