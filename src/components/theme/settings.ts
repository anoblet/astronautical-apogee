import { Base } from '@components/base';
import {
  getTheme,
  resetTheme,
  selectTheme,
  setProperty,
  subscribe,
} from '@utility/theme';
import { css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

const fields = [
  ['body-background-color', 'Background', 'color'],
  ['text-color', 'Text', 'color'],
  ['h1-color', 'Heading color', 'color'],
  ['navigation-a-color', 'Navigation links', 'color'],
] as const;
@customElement('theme-component')
export class ThemeComponent extends Base {
  @state() accessor properties = getTheme();
  private stop?: () => void;
  static styles = [
    ...super.styles,
    css`
      :host {
        display: grid;
        gap: 1.5rem;
        max-width: 40rem;
        width: 100%;
      }
      form {
        display: grid;
        gap: 1.5rem;
      }
      label {
        display: grid;
        gap: 0.5rem;
      }
      input,
      select,
      button {
        padding: 0.75rem;
        font: inherit;
        background: var(--body-background-color);
        color: var(--text-color);
        border: 1px solid var(--card-border-color);
        border-radius: 0.25rem;
        max-width: 100%;
      }
      input[type='color'] {
        width: 100%;
        height: 3rem;
        padding: 0.25rem;
      }
      button {
        cursor: pointer;
      }
    `,
  ];
  connectedCallback() {
    super.connectedCallback();
    this.stop = subscribe(() => {
      this.properties = getTheme();
    });
  }
  disconnectedCallback() {
    this.stop?.();
    super.disconnectedCallback();
  }
  private change = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.reportValidity()) setProperty(input.name, input.value);
  };
  private colorValue(name: string) {
    const value = this.properties[name];
    if (/^#[\da-f]{6}$/i.test(value || '')) return value;
    const probe = document.createElement('span');
    probe.style.color = `var(--${name})`;
    document.body.append(probe);
    const context = document.createElement('canvas').getContext('2d');
    if (!context) {
      probe.remove();
      return '#000000';
    }
    context.fillStyle = getComputedStyle(probe).color;
    context.fillRect(0, 0, 1, 1);
    const pixel = context.getImageData(0, 0, 1, 1).data;
    probe.remove();
    return (
      '#' +
      [...pixel]
        .slice(0, 3)
        .map(n => n.toString(16).padStart(2, '0'))
        .join('')
    );
  }
  render() {
    return html`<form @submit=${(event: Event) => event.preventDefault()}>
      <label
        >Theme<select
          .value=${this.properties.name}
          @change=${(event: Event) =>
            selectTheme(
              (event.target as HTMLSelectElement).value as 'light' | 'dark'
            )}
        >
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select></label
      >
      ${fields.map(
        ([name, label, type]) =>
          html`<label
            >${label}<input
              type=${type}
              name=${name}
              .value=${this.colorValue(name)}
              @change=${this.change}
          /></label>`
      )}
      <label
        >Heading size (px or rem)<input
          name="h1-font-size"
          .value=${this.properties['h1-font-size'] || ''}
          placeholder="40px"
          pattern="(?:[1-9][0-9]?(?:[.][0-9]+)?px|[1-5](?:[.][0-9]+)?rem)"
          @change=${this.change}
      /></label>
      <p>
        Changes apply immediately and stay in this browser when local storage is
        available. Reset restores the default dark theme and removes custom
        values.
      </p>
      <button type="button" @click=${resetTheme}>Reset appearance</button>
    </form>`;
  }
}
