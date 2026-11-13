import { Base } from '@components/base';
import '@components/icon';
import { chevronLeft, chevronRight } from '@icons/index';
import { css, html } from 'lit';
import {
  customElement,
  property,
  query,
  queryAssignedElements,
} from 'lit/decorators.js';

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
        position: relative;
      }

      :host([index='0']) #left {
        display: none;
      }

      icon-component {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        outline: none;
      }

      icon-component:focus {
        outline: 2px solid var(--color-accent-500, #19f9d8);
        outline-offset: 2px;
        border-radius: 50%;
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

  handleKeydown(event: KeyboardEvent, action: 'previous' | 'next') {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (action === 'previous') {
        this.previous();
      } else {
        this.next();
      }
    }
  }

  firstUpdated() {
    super.firstUpdated();

    this.shadowRoot
      ?.querySelector('#container')
      ?.addEventListener('scrollsnapchanging', event => {
        if (!('snapTargetInline' in event)) return;
        const { snapTargetInline } = event;
        if (
          !(snapTargetInline instanceof Element) ||
          !snapTargetInline.parentElement
        )
          return;
        this.index = Array.from(
          snapTargetInline.parentElement.children
        ).indexOf(snapTargetInline);

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
        <icon-component
          @click=${this.previous}
          @keydown=${(e: KeyboardEvent) => this.handleKeydown(e, 'previous')}
          id="left"
          role="button"
          tabindex="0"
          aria-label="Previous"
        >
          ${chevronLeft}
        </icon-component>
        <slot></slot>
        <icon-component
          @click=${this.next}
          @keydown=${(e: KeyboardEvent) => this.handleKeydown(e, 'next')}
          id="right"
          role="button"
          tabindex="0"
          aria-label="Next"
        >
          ${chevronRight}
        </icon-component>
      </div>
    `;
  }
}
