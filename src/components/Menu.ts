import { css, html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { globalStyles } from "../styles/global.ts";
import { menu } from "../icons/menu.ts";

@customElement("menu-component")
class MenuComponent extends LitElement {
  @property({ reflect: true, type: Boolean }) accessor opened = false;

  static styles = [
    globalStyles,
    css`
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
        display: grid;
        grid-template-columns: repeat(2, auto);
        align-items: center;
        height: 100%;
        justify-content: space-between;

        #icon {
          display: flex;
          align-items: center;
          padding: 1rem;

          &:hover {
            cursor: pointer;
            color: var(--color-rose-400);
          }
        }

        ul {
          margin: unset;
          padding-inline-start: unset;

          display: flex;
          list-style: none;
          height: 100%;
          overflow-x: auto;

          li {
            display: flex;
            align-items: center;
            font-weight: 500;
            color: var(--color-neutral-200);
            transition: color 0.2s ease-in-out;

            &:hover {
              cursor: pointer;
              color: var(--color-rose-400);
              transition: color 0.2s ease-in-out;
            }

            a {
              color: inherit;
              padding: 0.5rem 2rem;
            }
          }
        }
      }

      :host([opened]) {
        grid-template-columns: max-content 1fr max-content;
      }

      #icon {
        a {
          display: flex;
          align-items: center;
        }
        svg {
          height: 2rem;
          width: 2rem;
        }
      }
    `,
  ];

  firstUpdated() {
    this.addEventListener("click", () => {
      // this.opened = !this.opened;
    });

    this.shadowRoot
      ?.querySelector("#icon")
      ?.addEventListener("mouseenter", () => {
        // this.opened = true;
      });

    this.addEventListener("mouseleave", () => {
      // this.opened = false;
    });
  }

  render() {
    return html`
      <div id="icon">
        <a href="/" id="menu">${menu}</a>
      </div>
      ${this.opened
        ? html`
            <ul class="overflow-x" ?hidden=${!this.opened}>
              <li><a href="/portfolio">Portfolio</a></li>
              <li><a href="/projects">Projects</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/blog">Blog</a></li>
            </ul>
          `
        : nothing}
      <div id="social">
        <slot name="social"></slot>
      </div>
    `;
  }
}
