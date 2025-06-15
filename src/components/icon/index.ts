import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Base } from '@components/base';

@customElement('icon-component')
export class Icon extends Base {
  static styles = [...super.styles, css``];

  render() {
    return html`<slot></slot>`;
  }
}
