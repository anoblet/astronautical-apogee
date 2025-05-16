import { css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { globalStyles } from "../../styles/global";

export class Base extends LitElement {
  @property({ type: String }) accessor href = "";

  static styles = [globalStyles, css``];

  firstUpdated() {
    if (this.href) {
        const el = document.createElement("a");
        el.href = this.href;

        this.getRootNode().host.shadowRoot.insertBefore(el, this);
        el.appendChild(this);
    }
  }
}
