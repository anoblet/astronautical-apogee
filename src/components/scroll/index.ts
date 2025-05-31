import { Base } from "@components/base";
import { css, html } from "lit";
import { customElement } from "lit/decorators.js";
import "@components/icon";
import { chevronLeft, chevronRight } from "@icons/index";

@customElement("scroll-component")
export class ScrollComponent extends Base {
  static styles = [
    ...super.styles,
    css`
      :host {
        max-width: 100%;
        position: relative;
      }

      icon-component {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }

      ul {
        display: flex;
        list-style: none;
        overflow-x: auto;
      }

      li {
        flex-shrink: 0;
        width: 75vw;
      }

      svg {
        width: 1.5rem;
        height: 1.5rem;
      }

      #container {
        display: flex;
        gap: 0.5rem;
        scroll-snap-type: x mandatory;
        overflow-x: auto;
        scroll-behavior: smooth;
        scrollbar-width: none;
      }

      #left {
        left: 0;
      }

      #right {
        right: 0;
      }

      ::slotted(*) {
        flex-shrink: 0;
        padding: 0.25rem;
        scroll-snap-align: start;
        width: 100%;
      }

      svg {
        background-color: var(--color-neutral-900);
        border-radius: 50%;
        box-shadow: var(--box-shadow);
        width: 2.5rem;
        height: 2.5rem;
      }
    `,
  ];

  firstUpdated() {
    super.firstUpdated();

    const width = this.getBoundingClientRect().width;
    console.log(width);
  }

  render() {
    return html`
      <div id="container">
        <icon-component id="left">${chevronLeft}</icon-component>
        <slot></slot>
        <icon-component id="right">${chevronRight}</icon-component>
      </div>
    `;
  }
}
