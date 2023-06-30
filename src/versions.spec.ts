import { assert } from 'chai';

import { Language } from './bible.js';
import { findVersion } from './versions.js';

describe('findVersion', () => {
  it('should return version data for supported version', () => {
    assert.deepEqual(findVersion('NIV'), {
      abbreviation: 'NIV',
      name: 'New International Version',
      language: Language.English,
    });
  });

  it('should ignore character case', () => {
    assert.deepEqual(findVersion('NKJV'), findVersion('nkjv'));
  });

  it('should return null for unsupported version', () => {
    assert.isNull(findVersion('UNK'));
  });
});
