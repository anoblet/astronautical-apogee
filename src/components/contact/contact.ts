import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { globalStyles } from "../../styles/global";
import "../button/button";

@customElement("contact-component")
export class ContactComponent extends LitElement {
  static styles = [
    globalStyles,
    css`
      :host {
        bottom: 1rem;
        position: fixed;
        right: 1rem;
        width: max-content;
      }
    `,
  ];

  render() {
    return html`
      <button-component variant="primary">Schedule</button-component>
    `;
  }
}
