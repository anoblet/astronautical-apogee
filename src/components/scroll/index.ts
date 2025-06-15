import { Base } from '@components/base';
import { css, html } from 'lit';
import {
  customElement,
  property,
  state,
  query,
  queryAssignedElements,
} from 'lit/decorators.js';
import '@components/icon';
import { chevronLeft, chevronRight } from '@icons/index';

@customElement('scroll-component')
export class ScrollComponent extends Base {
  @property({ reflect: true, type: Number }) accessor index = 0;

  @query('#container') accessor container!: HTMLElement;
  @query('#left') accessor leftIcon!: HTMLElement;
  @query('#right') accessor rightIcon!: HTMLElement;

  @queryAssignedElements() accessor items!: HTMLElement[];

  static styles = [
    ...super.styles,
    css`
      :host {
        max-width: 100%;
        /* position: relative; */
      }

      :host([index='0']) #left {
        display: none;
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
        top: 50vh;
      }

      #right {
        right: 0;
        top: 50vh;
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

  previous() {
    if (this.index > 0) {
      this.index--;
    }

    this.container.scrollTo({
      left: this.items[this.index].offsetLeft,
      behavior: 'smooth',
    });
  }

  next() {
    if (this.index < this.items.length - 1) {
      this.index++;
    }

    this.container.scrollTo({
      left: this.items[this.index].offsetLeft,
      behavior: 'smooth',
    });
  }

  firstUpdated() {
    super.firstUpdated();

    this.shadowRoot
      ?.querySelector('#container')
      ?.addEventListener('scrollsnapchanging', ({ snapTargetInline }: any) => {
        this.index = Array.from(snapTargetInline.parentNode.children).indexOf(
          snapTargetInline
        );

        if (this.index === 0) {
          this.leftIcon.hidden = true;
        } else {
          this.leftIcon.hidden = false;
        }

        if (this.index === this.items.length - 1) {
          this.rightIcon.hidden = true;
        } else {
          this.rightIcon.hidden = false;
        }
      });
  }

  render() {
    return html`
      <div id="container">
        <icon-component @click=${this.previous} id="left">
          ${chevronLeft}
        </icon-component>
        <slot></slot>
        <icon-component @click=${this.next} id="right">
          ${chevronRight}
        </icon-component>
      </div>
    `;
  }
}
