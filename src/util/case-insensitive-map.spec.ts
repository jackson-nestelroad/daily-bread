import { assert } from 'chai';

import { CaseInsensitiveMap } from './case-insensitive-map';

describe('CaseInsensitiveMap', () => {
  it('should construct map from iterable', () => {
    const map = new CaseInsensitiveMap<number>([
      ['ABC', 1],
      ['def', 2],
    ]);
    assert.equal(map.size, 2);
  });

  it('should support case-insensitive insertion', () => {
    const map = new CaseInsensitiveMap<number>();
    map.set('ABC', 1);
    map.set('abc', 2);
    assert.equal(map.size, 1);
    assert.equal(map.get('ABC'), 2);
  });

  it('should support case-insensitive lookup', () => {
    const map = new CaseInsensitiveMap<number>();
    map.set('ABC', 1);
    map.set('def', 2);
    assert.isTrue(map.has('ABC'));
    assert.isTrue(map.has('abc'));
    assert.isTrue(map.has('Abc'));
    assert.isTrue(map.has('DEF'));
    assert.isTrue(map.has('def'));
    assert.isTrue(map.has('DEf'));
    assert.equal(map.get('ABC'), 1);
    assert.equal(map.get('abc'), 1);
    assert.equal(map.get('aBc'), 1);
    assert.equal(map.get('DEF'), 2);
    assert.equal(map.get('def'), 2);
    assert.equal(map.get('deF'), 2);
  });

  it('should support case-insensitive deletion', () => {
    const map = new CaseInsensitiveMap<number>();
    map.set('abc', 1);
    assert.equal(map.size, 1);
    map.delete('Abc');
    assert.equal(map.size, 0);
    assert.isFalse(map.has('abc'));
  });

  it('should clear values and internal keys', () => {
    const map = new CaseInsensitiveMap<number>([
      ['ABC', 1],
      ['def', 2],
    ]);
    assert.equal(map.size, 2);
    map.clear();
    assert.equal(map.size, 0);
    assert.equal([...map.keys()].length, 0);
  });

  it('should preserve original key case in keys()', () => {
    const map = new CaseInsensitiveMap<number>([
      ['ABC', 1],
      ['def', 2],
    ]);
    assert.deepEqual([...map.keys()], ['ABC', 'def']);
  });

  it('should preserve original key case in entries()', () => {
    const map = new CaseInsensitiveMap<number>([
      ['ABC', 1],
      ['def', 2],
    ]);
    assert.deepEqual(
      [...map.entries()],
      [
        ['ABC', 1],
        ['def', 2],
      ],
    );
  });

  it('should use original key case in forEach()', () => {
    const map = new CaseInsensitiveMap<number>([
      ['ABC', 1],
      ['def', 2],
    ]);
    const keys: string[] = [];
    map.forEach((value, key) => keys.push(key));
    assert.deepEqual(keys, ['ABC', 'def']);
  });
});
