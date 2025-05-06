import { css, html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("menu-component")
class MenuComponent extends LitElement {
  @property({ reflect: true, type: Boolean }) accessor opened = false;

  static styles = css`
    [hidden] {
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
    }

    :not([hidden]) {
      opacity: 1;
      transition: opacity 0.2s ease-in-out;
    }

    :host {
      display: flex;
      align-items: center;
      height: 100%;

      #icon {
        display: flex;
        align-items: center;
        padding: 1rem;
      }

      ul {
        margin: unset;
        padding-inline-start: unset;

        display: flex;
        list-style: none;
        height: 100%;

        li {
          display: flex;
          align-items: center;
          padding: 0.5rem 2rem;
          font-weight: 500;

          &:hover {
            cursor: pointer;
            /* background-color: hsla(0, 0%, 100%, 0.1); */
            color: var(--color-rose-400);
          }

          /* border-right: 1px solid var(--color-neutral-600); */
        }
      }
    }

    :host([opened]) {
      #icon {
        /* border-right: 1px solid var(--color-neutral-600); */
      }
    }
  `;

  firstUpdated() {
    this.addEventListener("click", () => {
      this.opened = !this.opened;
    });

    this.shadowRoot
      ?.querySelector("#icon")
      ?.addEventListener("mouseenter", () => {
        this.opened = true;
      });

    this.addEventListener("mouseleave", () => {
      this.opened = false;
    });
  }

  render() {
    return html`
      <div id="icon">
        <slot name="icon"></slot>
      </div>
      <ul ?hidden=${!this.opened}>
        <li>Projects</li>
        <li>Services</li>
      </ul>
    `;
  }
}
