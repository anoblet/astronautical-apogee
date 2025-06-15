import { Base } from '@components/base';
import { customElement, queryAll, state } from 'lit/decorators.js';
import { css, html } from 'lit';
import { BeforeRender } from '../../mixins/BeforeRenderMixin';

@customElement('settings-component')
export class SettingsComponent extends BeforeRender(Base) {
  @queryAll('input') accessor items!: NodeListOf<HTMLInputElement>;
  @state() accessor values: Record<string, string> = {};

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
    `,
  ];

  _onKeyUp(e: KeyboardEvent) {
    const target = e.target as HTMLInputElement;
    this.values[target.name] = target.value;
  }

  async firstUpdated(): Promise<void> {
    super.firstUpdated();
  }

  render() {
    return html`
      <h1>Settings</h1>
      <ul>
        <li>
          <label>
            H1 Font Size
            <input
              @keyup=${this._onKeyUp}
              name="h1-font-size"
              value=${this.values['h1-font-size'] || ''}
              type="text"
            />
          </label>
        </li>
      </ul>
    `;
  }
}
