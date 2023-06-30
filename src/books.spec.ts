import { assert } from 'chai';

import { CanonBook, DeuterocanonBook, Language } from './bible.js';
import { CanonBooks, DeuterocanonBooks, findBook } from './books.js';

describe('findBook', () => {
  it('should find book from abbreviation', () => {
    assert.equal(findBook(CanonBook.Genesis, Language.English), CanonBooks[CanonBook.Genesis]);
  });

  it('should find book from full name', () => {
    assert.equal(findBook('Exodus', Language.English), CanonBooks[CanonBook.Exodus]);
  });

  it('should ignore character case', () => {
    assert.equal(findBook('MATTHEW', Language.English), findBook('matthew', Language.English));
    assert.equal(findBook('WISDOM', Language.English, true), findBook('wisdom', Language.English, true));
  });

  it('should find book from alias', () => {
    assert.equal(findBook('Song of Songs', Language.English), findBook('Song of Solomon', Language.English));
    assert.equal(findBook('1SAM', Language.English), findBook('1 Sam', Language.English));
    assert.equal(findBook('GKESTH', Language.English, true), findBook('GK ESTH', Language.English, true));
  });

  it('should return null for not found', () => {
    assert.isNull(findBook('Unknown', Language.English));
  });

  it('should ignore deuterocanon book', () => {
    assert.isNull(findBook(DeuterocanonBook.FirstMaccabees, Language.English));
  });

  it('should find deuterocanon book', () => {
    assert.equal(findBook(DeuterocanonBook.Baruch, Language.English, true), DeuterocanonBooks[DeuterocanonBook.Baruch]);
    assert.equal(findBook('Psalm 151', Language.English, true), DeuterocanonBooks[DeuterocanonBook.PsalmOneFiftyOne]);
  });
});
