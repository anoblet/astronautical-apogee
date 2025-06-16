import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import email from '../../assets/icons/email.svg?raw';
import github from '../../assets/icons/github.svg?raw';
import linkedin from '../../assets/icons/linkedin.svg?raw';
import { globalStyles } from '../../styles/global.ts';

console.log(linkedin);

@customElement('social-component')
export class Social extends LitElement {
  static styles = [
    globalStyles,
    css`
      :host {
        display: flex;
        gap: 1rem;
        justify-content: center;
        padding: 0 1rem;
      }
    `,
  ];

  render() {
    return html`
      <a
        href="https://www.linkedin.com/in/andrew-noblet/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <icon-component part="icon">${unsafeHTML(linkedin)}</icon-component>
      </a>
      <a
        href="https://github.com/anoblet"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
      >
        <icon-component part="icon">${unsafeHTML(github)}</icon-component>
      </a>
      <a href="mailto:andrewbnoblet@gmail.com" aria-label="Email">
        <icon-component part="icon">${unsafeHTML(email)}</icon-component>
      </a>
    `;
  }
}
