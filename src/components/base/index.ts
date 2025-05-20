import { LitElement } from "lit";
import { property } from "lit/decorators.js";
import { globalStyles } from "../../styles/global";

export class Base extends LitElement {
  @property({ type: String }) accessor href = "";

  accessor classes = ["component"];

  static styles = [globalStyles];

  firstUpdated() {
    if (this.href) {
      const el = document.createElement("a");
      el.href = this.href;

      this.parentElement?.replaceChild(el, this);

      el.appendChild(this);
    }

    this.classes.forEach((className) => {
      this.classList.add(className);
    });
  }
}
