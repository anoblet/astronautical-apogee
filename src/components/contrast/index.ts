import { Base } from '@components/base';
import '@components/icon';
import { contrast } from '@icons/contrast';
import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('contrast-component')
export class ContrastComponent extends Base {
  @state() accessor dark = true;

  firstUpdated() {
    super.firstUpdated();

    const item = localStorage.getItem('dark');
    if (item === null) {
      this.dark = true; // Default to dark mode if not set
    } else {
      this.dark = item === 'true';
    }

    document.documentElement.classList.toggle('dark', this.dark);

    this.addEventListener('click', () => {
      this.dark = !this.dark;
      document.documentElement.classList.toggle('dark', this.dark);
      localStorage.setItem('dark', String(this.dark));
    });
  }

  render() {
    return html`<icon-component>${contrast}</icon-component>`;
  }
}

// if (light.styleSheet) {
//   document.adoptedStyleSheets = [
//     ...document.adoptedStyleSheets,
//     light.styleSheet,
//   ];
// } else {
//   console.error("Global styles not loaded");
// }
