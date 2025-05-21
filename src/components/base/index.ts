import { LitElement } from "lit";
import { property } from "lit/decorators.js";
import { globalStyles } from "../../styles/global";
import { subscribe } from "src/media";

export class Base extends LitElement {
  @property({ type: String }) accessor href = "";
  @property({ type: String }) accessor media = "desktop";

  accessor classes = ["component"];

  static styles = [globalStyles];

  firstUpdated() {
    if (this.href) {
      const el = document.createElement("a");
      el.href = this.href;

      this.parentElement?.replaceChild(el, this);

      el.appendChild(this);
    }
  }
}
