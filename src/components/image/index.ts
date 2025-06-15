import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { globalStyles } from '../../styles/global';

@customElement('image-component')
export class ImageComponent extends LitElement {
  @property({ type: String }) accessor alt = '';
  @property({ reflect: true, type: Boolean }) accessor loaded = false;
  @property({ type: String }) accessor src = '';

  static styles = [
    globalStyles,
    css`
      img {
        width: 100%;
      }
    `,
  ];

  firstUpdated() {
    const img = this.shadowRoot?.querySelector('img');
    if (img) {
      img.addEventListener('load', this.onLoad.bind(this));
    }
  }

  onLoad() {
    this.loaded = true;
  }

  render() {
    return html`<img src="${this.src}" alt="${this.alt}" />`;
  }
}
