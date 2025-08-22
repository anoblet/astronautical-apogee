/**
 * Unit tests for Button Component
 * Tests the custom button web component functionality
 */

import { html } from 'lit';
import { expect, fixture } from '@open-wc/testing';

// Import the button component to ensure it's registered
import '../../../src/components/button/index.ts';

describe('Button Component', () => {
  it('should render with default properties', async () => {
    const element = await fixture(html`
      <button-component>Click me</button-component>
    `);

    expect(element).to.exist;
    expect(element.tagName.toLowerCase()).to.equal('button-component');
    expect(element.textContent.trim()).to.equal('Click me');
  });

  it('should render with href attribute as a link', async () => {
    const element = await fixture(html`
      <button-component href="/test">Link Button</button-component>
    `);

    // Should render as an anchor element internally
    const link = element.shadowRoot.querySelector('a');
    expect(link).to.exist;
    expect(link.getAttribute('href')).to.equal('/test');
    expect(link.textContent.trim()).to.include('Link Button');
  });

  it('should render with variant attribute', async () => {
    const element = await fixture(html`
      <button-component variant="primary">Primary Button</button-component>
    `);

    expect(element.getAttribute('variant')).to.equal('primary');

    // Check that the variant class is applied
    const button = element.shadowRoot.querySelector('button, a');
    expect(button.classList.contains('button-primary')).to.be.true;
  });

  it('should handle click events', async () => {
    let clicked = false;

    const element = await fixture(html`
      <button-component @click=${() => (clicked = true)}>
        Clickable Button
      </button-component>
    `);

    const button = element.shadowRoot.querySelector('button');
    button.click();

    expect(clicked).to.be.true;
  });

  it('should be accessible', async () => {
    const element = await fixture(html`
      <button-component>Accessible Button</button-component>
    `);

    const button = element.shadowRoot.querySelector('button');

    // Should be focusable
    expect(button.tabIndex).to.not.equal(-1);

    // Should have proper role
    expect(
      button.getAttribute('role') || button.tagName.toLowerCase()
    ).to.equal('button');
  });

  it('should support disabled state', async () => {
    const element = await fixture(html`
      <button-component disabled>Disabled Button</button-component>
    `);

    const button = element.shadowRoot.querySelector('button');
    expect(button.disabled).to.be.true;
  });

  it('should work with different variants', async () => {
    const variants = ['primary', 'secondary'];

    for (const variant of variants) {
      const element = await fixture(html`
        <button-component variant="${variant}">
          ${variant} Button
        </button-component>
      `);

      expect(element.getAttribute('variant')).to.equal(variant);

      const button = element.shadowRoot.querySelector('button, a');
      expect(button.classList.contains(`button-${variant}`)).to.be.true;
    }
  });

  it('should handle icon content', async () => {
    const element = await fixture(html`
      <button-component>
        Button with Icon
        <svg class="icon"><use href="#arrow"></use></svg>
      </button-component>
    `);

    const icon = element.querySelector('svg');
    expect(icon).to.exist;
    expect(icon.classList.contains('icon')).to.be.true;
  });

  it('should maintain responsive design', async () => {
    const element = await fixture(html`
      <button-component class="min-width-25vw">
        Responsive Button
      </button-component>
    `);

    expect(element.classList.contains('min-width-25vw')).to.be.true;
  });

  it('should handle external links properly', async () => {
    const element = await fixture(html`
      <button-component href="https://external.com">
        External Link
      </button-component>
    `);

    const link = element.shadowRoot.querySelector('a');
    expect(link.getAttribute('href')).to.equal('https://external.com');

    // External links should have proper attributes
    if (
      link.href.startsWith('http') &&
      !link.href.includes(window.location.hostname)
    ) {
      expect(link.getAttribute('target')).to.equal('_blank');
      expect(link.getAttribute('rel')).to.include('noopener');
    }
  });
});
