import { LitElement, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

type Constructor = new () => LitElement;

export interface BeforeRenderInterface {
  beforeRenderComplete: boolean;
}

type ReturnConstructor = new () => LitElement & BeforeRenderInterface;

export const BeforeRender = function <B extends Constructor>(
  Base: B
): B & ReturnConstructor {
  // Lit elements use a zero-argument constructor. Widen the local base so
  // TypeScript does not require an untyped variadic mixin constructor.
  const ElementBase: Constructor = Base;
  class Mixin extends ElementBase implements BeforeRenderInterface {
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

    public shouldUpdate(changedProperties: PropertyValues) {
      return this.beforeRenderComplete && super.shouldUpdate(changedProperties);
    }
  }

  // The local widening hides B from the compiler; runtime inheritance keeps it.
  return Mixin as unknown as B & ReturnConstructor;
};
