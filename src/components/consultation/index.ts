import { Base } from '@components/base';
import '@components/button';
import '@components/icon';
import { arrowForward } from '@icons/index';
import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('consultation-component')
export class Consultation extends Base {
  @property({ type: String }) accessor copy: string = '';

  copyArray = [
    'Interested in Working Together?',
    'Let’s Connect!',
    'Ready to Collaborate?',
    'Let’s Discuss Your Project!',
    'Let’s Bring Your Project to Life!',
    'Let’s Make Your Vision a Reality!',
    'Let’s Create Something Amazing Together!',
    'Let’s Start Your Project Journey!',
  ];

  constructor() {
    super();
    this.copy =
      this.copyArray[Math.floor(Math.random() * this.copyArray.length)];
  }

  static styles = [
    ...super.styles,
    css`
      :host {
        --a-color: inherit;
        --icon-padding: 0.25rem;

        justify-content: center;
      }

      button-component {
        gap: 0.5rem;
      }
    `,
  ];

  render() {
    return html`
      <section class="gap grid justify-content-center text-align-center">
        <h2>${this.copy}</h2>
        <p>
          Let's connect and discuss how my experience can help bring your
          project to life.
        </p>
        <div></div>
        <a
          class="justify-content-center"
          href="https://calendar.app.google/JjnLtVR6mnM11FcS9"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button-component variant="primary">
            Schedule a consultation<icon-component
              >${arrowForward}</icon-component
            >
          </button-component>
        </a>
      </section>
    `;
  }
}
