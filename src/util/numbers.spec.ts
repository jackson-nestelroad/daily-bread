import { assert } from 'chai';

import { bindNumberToRange, removeSuperscriptNumbers, replaceNumbersWithSuperscript, splitRange } from './numbers';

describe('bindNumberToRange', () => {
  it('should return low when n < low', () => {
    assert.equal(bindNumberToRange(0, [1, 20]), 1);
  });

  it('should return high when n > high', () => {
    assert.equal(bindNumberToRange(9000, [5, 9]), 9);
  });

  it('should return n when n is in range', () => {
    assert.equal(bindNumberToRange(20, [10, 50]), 20);
  });
});

describe('replaceNumbersWithSuperscript', () => {
  it('should not affect non-numeric characters', () => {
    assert.equal(replaceNumbersWithSuperscript('test'), 'test');
  });

  it('should replace numbers with superscript', () => {
    assert.equal(
      replaceNumbersWithSuperscript('0123456789'),
      '\u{2070}\u{00B9}\u{00B2}\u{00B3}\u{2074}\u{2075}\u{2076}\u{2077}\u{2078}\u{2079}',
    );
  });
});

describe('removeSuperscriptNumbers', () => {
  it('should not affect non-numeric characters', () => {
    assert.equal(removeSuperscriptNumbers('test'), 'test');
  });

  it('should replace numbers with superscript', () => {
    assert.equal(
      removeSuperscriptNumbers('\u{2070}\u{00B9}\u{00B2}\u{00B3}\u{2074}test\u{2075}\u{2076}\u{2077}\u{2078}\u{2079}'),
      'test',
    );
  });

  it('should remove trailing whitespace', () => {
    assert.equal(removeSuperscriptNumbers('\u{00B9}\u{00B2} Verse'), 'Verse');
  });
});

describe('splitRange', () => {
  it('should split range into chunks', () => {
    assert.deepEqual(splitRange([1, 20], 5), [
      [1, 5],
      [6, 10],
      [11, 15],
      [16, 20],
    ]);
  });

  it('should include leftover numbers', () => {
    assert.deepEqual(splitRange([12, 17], 4), [
      [12, 15],
      [16, 17],
    ]);
  });

  it('should return single range for equal numbers', () => {
    assert.deepEqual(splitRange([9, 9], 3), [[9, 9]]);
  });

  it('should return empty range when start greater than end', () => {
    assert.deepEqual(splitRange([2, 1], 4), []);
  });

  it('should return single number range at end', () => {
    assert.deepEqual(splitRange([2, 14], 4), [
      [2, 5],
      [6, 9],
      [10, 13],
      [14, 14],
    ]);
  });
});
