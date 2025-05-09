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
      display: grid;
      grid-template-columns: repeat(2, auto);
      align-items: center;
      height: 100%;
      justify-content: space-between;

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
        overflow-x: auto;

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
      grid-template-columns: max-content 1fr max-content;

      #icon {
        /* border-right: 1px solid var(--color-neutral-600); */
      }
    }

    a {
      text-decoration: none;
      color: inherit;
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
      ${this.opened
        ? html`
            <ul class="overflow-x" ?hidden=${!this.opened}>
              <li><a href="/">Home</a></li>
              <li><a href="/projects">Projects</a></li>
              <li>Services</li>
            </ul>
          `
        : nothing}
      <div id="social">
        <slot name="social"></slot>
      </div>
    `;
  }
}
