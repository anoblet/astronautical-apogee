import { Base } from '@components/base';
import { contrast } from '@icons/contrast';
import dark from '@themes/dark.json' assert { type: 'json' };
import light from '@themes/light.json' assert { type: 'json' };
import { css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { applyTheme } from '@utility/theme';

export const applyStoredTheme = () => {
  const storedTheme = getStoredTheme();
  if (storedTheme) {
    applyTheme(storedTheme);
  }
};

export const getStoredTheme = () => {
  const storedTheme = localStorage.getItem('theme');
  return storedTheme ? JSON.parse(storedTheme) : null;
};

export const setStoredTheme = (theme: Record<string, string>) => {
  localStorage.setItem('theme', JSON.stringify(theme));
};

@customElement('theme-toggle')
export class ThemeToggle extends Base {
  @state()
  private accessor _theme: Record<string, string> = light;

  static styles = [
    ...super.styles,
    css`
      :host {
        background-color: var(--button-background-color);
        color: var(--button-color);
        cursor: pointer;
      }

      :host(:hover) {
        background-color: var(--button-hover-background-color);
        color: var(--button-hover-color);
        transform: scale(1.05);
        transition: transform 0.1s ease-in-out;
      }

      icon-component {
        color: inherit;

        &:hover {
          color: inherit;
        }
      }
    `,
  ];

  _toggleTheme() {
    this._theme = this._theme.name === 'light' ? dark : light;
    applyTheme(this._theme);
    setStoredTheme(this._theme);
  }

  connectedCallback() {
    super.connectedCallback();

    const storedTheme = getStoredTheme();
    if (storedTheme) {
      this._theme = storedTheme;
    }
  }

  firstUpdated() {
    super.firstUpdated();

    this.addEventListener('click', this._toggleTheme.bind(this));
  }

  render() {
    return html`<icon-component>${contrast}</icon-component>`;
  }
}
