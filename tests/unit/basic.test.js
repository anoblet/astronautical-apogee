/**
 * Simple unit test to verify testing infrastructure
 */

import { expect } from '@esm-bundle/chai';

describe('Basic Infrastructure Test', () => {
  it('should have working test framework', () => {
    expect(true).to.be.true;
    expect(1 + 1).to.equal(2);
  });

  it('should support async tests', async () => {
    const result = await Promise.resolve('test');
    expect(result).to.equal('test');
  });

  it('should have access to DOM APIs', () => {
    const div = document.createElement('div');
    div.textContent = 'Hello, World!';
    expect(div.textContent).to.equal('Hello, World!');
  });
});
