import { LitElement } from "lit";
import { property } from "lit/decorators.js";

type Constructor = new (...args: any[]) => LitElement;

export interface BeforeRenderInterface {
  beforeRenderComplete: boolean;
}

type ReturnConstructor = new (...args: any[]) => LitElement &
  BeforeRenderInterface;

export const BeforeRender = function <B extends Constructor>(
  Base: B
): B & ReturnConstructor {
  class Mixin extends Base implements BeforeRenderInterface {
    @property({ type: Boolean })
    public accessor beforeRenderComplete: boolean = false;

    public connectedCallback() {
      super.connectedCallback();

      if (!this.beforeRenderComplete)
        this.beforeRender().then(() => (this.beforeRenderComplete = true));
    }

    public async beforeRender() {
      return;
    }

    public shouldUpdate(changedProperties: any) {
      return this.beforeRenderComplete && super.shouldUpdate(changedProperties);
    }
  }

  return Mixin;
};
