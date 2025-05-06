import { css, html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("menu-component")
class MenuComponent extends LitElement {
  @property({ type: Boolean }) accessor isOpen = false;

  static styles = css`
    [hidden] {
      opacity: 0;
    }

    :not([hidden]) {
      opacity: 1;
      transition: opacity 0.2s ease-in-out;
    }

    :host {
      display: flex;
      align-items: center;
      gap: 2rem;

      #icon {
        display: flex;
        align-items: center;
        padding: 1rem;
      }

      ul {
        margin: unset;
        padding-inline-start: unset;

        display: flex;
        gap: 2rem;
        list-style: none;

        li {
          padding: 0.5rem 1rem;

          &:hover {
            cursor: pointer;
            /* background-color: hsla(0, 0%, 100%, 0.1); */
            color: var(--color-rose-400);
          }
        }
      }
    }
  `;

  firstUpdated() {
    this.addEventListener("click", () => {
      this.isOpen = !this.isOpen;
    });

    this.addEventListener("mouseenter", () => {
      this.isOpen = true;
    });

    this.addEventListener("mouseleave", () => {
      this.isOpen = false;
    });
  }

  render() {
    return html`
      <div id="icon">
        <slot name="icon"></slot>
      </div>
      <ul ?hidden=${!this.isOpen}>
        <li>Projects</li>
        <li>Services</li>
      </ul>
    `;
  }
}
