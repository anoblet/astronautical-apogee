import { Base } from '@components/base';
import '@components/button';
import { arrowBack } from '@icons/arrow-back';
import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('contact-component')
export class ContactComponent extends Base {
  static styles = [...super.styles, css``];

  render() {
    return html`
      <a
        class="padding"
        href="${this.href}"
        target="_blank"
        rel="noopener noreferrer"
      >
        ${arrowBack}
      </a>
    `;
  }
}
