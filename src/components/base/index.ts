import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { globalStyles } from '../../styles/global';
import { subscribe } from '@utility/theme';

export class Base extends LitElement {
  @property({ type: String }) accessor href = '';
  @property({ type: String }) accessor media = 'desktop';
  accessor classes = ['component'];
  static styles = [globalStyles];
  private unsubscribe?: () => void;

  connectedCallback() {
    super.connectedCallback();
    this.unsubscribe = subscribe(theme =>
      this.setAttribute('data-theme', theme)
    );
  }
  disconnectedCallback() {
    this.unsubscribe?.();
    super.disconnectedCallback();
  }
  firstUpdated() {
    this.classList.add(...this.classes);
  }
}
