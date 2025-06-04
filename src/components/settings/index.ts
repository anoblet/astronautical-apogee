import { Base } from "@components/base";
import { customElement, queryAll, state } from "lit/decorators.js";
import { css, html } from "lit";
import "@fluentui/web-components/text-input.js";
import { BeforeRender } from "../../mixins/BeforeRenderMixin";

@customElement("settings-component")
export class SettingsComponent extends BeforeRender(Base) {
  @queryAll("fluent-text-input") accessor items!: NodeListOf<HTMLElement>;

  static styles = [
    ...super.styles,
    css`
      :host {
        flex-direction: column;
        width: 100%;
      }

      fluent-text-input::part(root) {
        border: 1px solid var(--color-neutral-200);
        border-radius: var(--border-radius);
      }

      ul {
        list-style: none;
      }
    `,
  ];

  async firstUpdated(): Promise<void> {
    super.firstUpdated();

  }

  render() {
    return html`
      <h1>Settings</h1>
      <ul>
        <li>
          <fluent-text-input
            @keyup=${this._onKeyUp}
            name="h1-font-size"
            value=${this.values["h1-font-size"] || ""}
          >
            H1 Font Size
          </fluent-text-input>
        </li>
      </ul>
    `;
  }
}
