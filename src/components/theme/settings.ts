import { Base } from '@components/base';
import { css, html } from 'lit';
import { customElement, queryAll, state } from 'lit/decorators.js';
import { BeforeRender } from '../../mixins/BeforeRenderMixin';

@customElement('theme-component')
export class ThemeComponent extends BeforeRender(Base) {
  @queryAll('input') accessor items!: NodeListOf<HTMLInputElement>;

  @state() accessor properties: Record<string, string> = {};

  static styles = [
    ...super.styles,
    css`
      :host {
        flex-direction: column;
        width: 100%;
      }

      input {
        border: 1px solid var(--color-neutral-200);
        border-radius: var(--border-radius);
        padding: 0.5rem;
        font-family: inherit;
        font-size: inherit;
        background-color: var(--background-color);
        color: var(--text-color);

        &:focus {
          outline: 2px solid var(--color-teal-200);
          outline-offset: 2px;
        }
      }

      label {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        font-weight: 500;
      }

      ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      button {
        padding: 0.75rem 1.5rem;
        background-color: var(--color-teal-200);
        color: var(--color-neutral-900);
        border: none;
        border-radius: var(--border-radius);
        font-weight: 600;
        cursor: pointer;
        margin-top: 1rem;

        &:hover {
          background-color: var(--color-teal-300);
        }
      }
    `,
  ];

  constructor() {
    super();

    this.properties = getTheme();
  }

  _onChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    if (target && target.name) {
      setProperty(target.name, target.value.trim());
      this.properties[target.name] = target.value.trim();
      this._saveProperties();
    }
  }

  _saveProperties(): void {
    window.localStorage.setItem('theme', JSON.stringify(this.properties));
  }

  render() {
    return html`
      <h1>Theme</h1>
      <ul>
        <li>
          <label>
            Background Color
            <input
              @change=${this._onChange}
              name="background-color"
              value=${this.properties['background-color'] || ''}
              type="color"
            />
          </label>
        </li>
        <li>
          <label>
            Text Color
            <input
              @change=${this._onChange}
              name="text-color"
              value=${this.properties['text-color'] || ''}
              type="color"
            />
          </label>
        </li>
        <li>
          <label>
            H1 Color
            <input
              @change=${this._onChange}
              name="h1-color"
              value=${this.properties['h1-color'] || ''}
              type="color"
            />
          </label>
        </li>
        <li>
          <label>
            H1 Font Size
            <input
              @change=${this._onChange}
              name="h1-font-size"
              value=${this.properties['h1-font-size'] || ''}
              type="text"
            />
          </label>
        </li>
        <li>
          <label>
            Navigation Link Color
            <input
              @change=${this._onChange}
              name="navigation-a-color"
              value=${this.properties['navigation-a-color'] || ''}
              type="color"
            />
          </label>
        </li>
      </ul>
      <button @click=${resetTheme}>Reset to Default Theme</button>
    `;
  }
}
