import { assert } from 'chai';

import { applyDefaults } from './options.js';

describe('applyDefaults', () => {
  interface Options {
    a?: boolean;
    b?: number;
    c?: string;
  }

  it('applies all defaults to empty object', () => {
    const options: Options = {};
    const defaults: Required<Options> = {
      a: true,
      b: 20,
      c: 'foo',
    };
    applyDefaults(options, defaults);
    assert.deepEqual(options, defaults);
  });

  it('applies defaults to unspecified fields', () => {
    const options: Options = {
      b: 3,
    };
    const defaults: Required<Options> = {
      a: true,
      b: 20,
      c: 'foo',
    };
    applyDefaults(options, defaults);
    assert.deepEqual(options, {
      a: true,
      b: 3,
      c: 'foo',
    });
  });

  it('applies no defaults to full options object', () => {
    const options: Options = {
      a: false,
      b: 3,
      c: 'bar',
    };
    const defaults: Required<Options> = {
      a: true,
      b: 20,
      c: 'foo',
    };
    applyDefaults(options, defaults);
    assert.deepEqual(options, {
      a: false,
      b: 3,
      c: 'bar',
    });
  });
});
