import { Base } from '@components/base';
import { contrast } from '@icons/contrast';
import dark from '@themes/dark.json' assert { type: 'json' };
import light from '@themes/light.json' assert { type: 'json' };
import { css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('theme-toggle')
export class ThemeToggle extends Base {
  @state()
  private accessor _theme: Record<string, string> = light;

  static styles = [
    ...super.styles,
    css`
      :host {
        cursor: pointer;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 1000;
      }
    `,
  ];

  _toggleTheme() {
    console.log(this._theme.name);
    this._theme = this._theme.name === 'light' ? dark : light;
    console.log(this._theme.name);
    applyTheme(this._theme);
    setStoredTheme(this._theme);
  }

  firstUpdated() {
    super.firstUpdated();
    const storedTheme = getStoredTheme();
    if (storedTheme) {
      this._theme = storedTheme;
    }
  }

  render() {
    return html`<icon-component @click=${this._toggleTheme}
      >${contrast}</icon-component
    >`;
  }
}

export const applyStoredTheme = () => {
  const storedTheme = getStoredTheme();
  if (storedTheme) {
    applyTheme(storedTheme);
  }
};

export const applyTheme = (theme: Record<string, string>) => {
  for (const [name, value] of Object.entries(theme)) {
    document.documentElement.style.setProperty(`--${name}`, value.trim());
  }
};

export const getStoredTheme = () => {
  const storedTheme = localStorage.getItem('theme');
  return storedTheme ? JSON.parse(storedTheme) : null;
};

export const setStoredTheme = (theme: Record<string, string>) => {
  localStorage.setItem('theme', JSON.stringify(theme));
};

applyStoredTheme();
