import { Base } from "@components/base";
import { customElement, queryAll, state } from "lit/decorators.js";
import { css, html } from "lit";
import "@fluentui/web-components/text-input.js";
import { BeforeRender } from "../../mixins/BeforeRenderMixin";
import defaultTheme from "@themes/default.json" assert { type: "json" };

const setProperty = (name: string, value: string) => {
  document.documentElement.style.setProperty(`--${name}`, value.trim());
};

const setProperties = (properties: Record<string, string>) => {
  for (const [name, value] of Object.entries(properties)) {
    setProperty(name, value);
  }
};

export const applyStoredTheme = () => {
  setProperties(getTheme());
};

export const getTheme = (): Record<string, string> => {
  const storedTheme = window.localStorage.getItem("theme");

  return storedTheme
    ? { ...defaultTheme, ...JSON.parse(storedTheme) }
    : defaultTheme;
};

export const resetTheme = () => {
  window.localStorage.removeItem("theme");
  setProperties(defaultTheme);
};

@customElement("theme-component")
export class ThemeComponent extends BeforeRender(Base) {
  @queryAll("fluent-text-input") accessor items!: NodeListOf<HTMLElement>;

  @state() accessor properties: Record<string, string> = {};

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
    window.localStorage.setItem("theme", JSON.stringify(this.properties));
  }

  render() {
    return html`
      <h1>Theme</h1>
      <ul>
        <li>
          <fluent-text-input
            @change=${this._onChange}
            name="background-color"
            value=${this.properties["background-color"] || ""}
          >
            Background Color
          </fluent-text-input>
        </li>
        <li>
          <fluent-text-input
            @change=${this._onChange}
            name="text-color"
            value=${this.properties["text-color"] || ""}
          >
            Text Color
          </fluent-text-input>
        </li>
        <li>
          <fluent-text-input
            @change=${this._onChange}
            name="h1-color"
            value=${this.properties["h1-color"] || ""}
          >
            H1 Color
          </fluent-text-input>
        </li>
        <li>
          <fluent-text-input
            @change=${this._onChange}
            name="h1-font-size"
            value=${this.properties["h1-font-size"] || ""}
          >
            H1 Font Size
          </fluent-text-input>
        </li>
        <li>
          <fluent-text-input
            @change=${this._onChange}
            name="navigation-a-color"
            value=${this.properties["navigation-a-color"] || ""}
          >
            Navigation Link Color
          </fluent-text-input>
        </li>
      </ul>
      <button @click=${resetTheme}>Reset to Default Theme</button>
    `;
  }
}
