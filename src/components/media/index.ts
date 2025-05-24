import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { subscribe } from "src/media";

@customElement("media-component")
class MediaComponent extends LitElement {
  @property({ reflect: true, type: String }) accessor media = "desktop";

  static styles = css`
    :host {
      display: none;
      width: 100%;
    }

    :host([desktop][media="desktop"]) {
      display: flex;
      flex-direction: column;
    }

    :host([mobile][media="mobile"]) {
      display: flex;
      flex-direction: column;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    subscribe((media: string) => {
      this.media = media;
    });
  }

  render() {
    return html`<slot></slot>`;
  }
}
