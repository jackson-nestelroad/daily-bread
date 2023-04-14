import { assert } from 'chai';

import { CanonBook, Language } from './bible';
import { CanonBooks } from './books';
import { PassageReference, cleanPassageReference, formatPassageReference, parsePassageReferences } from './reference';

describe('parsePassageReferences', () => {
  it('should parse book alone', () => {
    assert.deepEqual(parsePassageReferences('Genesis'), [
      {
        book: 'Genesis',
        from: {},
        to: {},
      },
    ]);
  });

  it('should parse book alone with leading number', () => {
    assert.deepEqual(parsePassageReferences('1 Samuel'), [
      {
        book: '1 Samuel',
        from: {},
        to: {},
      },
    ]);
  });

  it('should parse book alone with leading number, no space', () => {
    assert.deepEqual(parsePassageReferences('1KGS'), [
      {
        book: '1KGS',
        from: {},
        to: {},
      },
    ]);
  });

  it('should parse book and chapter', () => {
    assert.deepEqual(parsePassageReferences('Exodus 20'), [
      {
        book: 'Exodus',
        from: { chapter: 20 },
        to: {},
      },
    ]);
  });

  it('should parse book and chapter range', () => {
    assert.deepEqual(parsePassageReferences('Leviticus 1-11'), [
      {
        book: 'Leviticus',
        from: { chapter: 1 },
        to: { chapter: 11 },
      },
    ]);
  });

  it('should parse book, chapter, and verse', () => {
    assert.deepEqual(parsePassageReferences('Numbers 12:13'), [
      {
        book: 'Numbers',
        from: { chapter: 12, verse: 13 },
        to: {},
      },
    ]);
  });

  it('should parse book, chapter, and verse range', () => {
    assert.deepEqual(parsePassageReferences('Deuteronomy 9:25-29'), [
      {
        book: 'Deuteronomy',
        from: { chapter: 9, verse: 25 },
        to: { chapter: 9, verse: 29 },
      },
    ]);
  });

  it('should parse book and verse range across multiple chapters', () => {
    assert.deepEqual(parsePassageReferences('Judges 6:11-8:35'), [
      {
        book: 'Judges',
        from: { chapter: 6, verse: 11 },
        to: { chapter: 8, verse: 35 },
      },
    ]);
  });

  it('should return empty list', () => {
    assert.lengthOf(parsePassageReferences('9001'), 0);
  });

  it('should parse multiple references', () => {
    assert.deepEqual(
      parsePassageReferences(
        'Mark 4:26-29;Luke 7:41-43,Matthew 5:14-15, Luke 10:25-37. Luke 11:5-8 Luke 12:16-21  Luke 6:46-49\t\nMatthew 9:16-17',
      ),
      [
        {
          book: 'Mark',
          from: { chapter: 4, verse: 26 },
          to: { chapter: 4, verse: 29 },
        },
        {
          book: 'Luke',
          from: { chapter: 7, verse: 41 },
          to: { chapter: 7, verse: 43 },
        },
        {
          book: 'Matthew',
          from: { chapter: 5, verse: 14 },
          to: { chapter: 5, verse: 15 },
        },
        {
          book: 'Luke',
          from: { chapter: 10, verse: 25 },
          to: { chapter: 10, verse: 37 },
        },
        {
          book: 'Luke',
          from: { chapter: 11, verse: 5 },
          to: { chapter: 11, verse: 8 },
        },
        {
          book: 'Luke',
          from: { chapter: 12, verse: 16 },
          to: { chapter: 12, verse: 21 },
        },
        {
          book: 'Luke',
          from: { chapter: 6, verse: 46 },
          to: { chapter: 6, verse: 49 },
        },
        {
          book: 'Matthew',
          from: { chapter: 9, verse: 16 },
          to: { chapter: 9, verse: 17 },
        },
      ],
    );
  });
});

describe('cleanPassageReference', () => {
  it('should pass empty object', () => {
    const reference = {} as PassageReference;
    assert.doesNotThrow(() => {
      cleanPassageReference(reference, CanonBooks[CanonBook.Genesis], Language.English);
    });
    assert.deepEqual(reference, { book: 'Genesis', from: {}, to: {} });
  });

  it('should pass book alone', () => {
    const reference: PassageReference = { book: 'GEN' };
    assert.doesNotThrow(() => {
      cleanPassageReference(reference, CanonBooks[CanonBook.Genesis], Language.English);
    });
    assert.deepEqual(reference, { book: 'Genesis', from: {}, to: {} });
  });

  it('should pass book and empty start', () => {
    const reference: PassageReference = { book: 'GEN', from: {} };
    assert.doesNotThrow(() => {
      cleanPassageReference(reference, CanonBooks[CanonBook.Genesis], Language.English);
    });
    assert.deepEqual(reference, { book: 'Genesis', from: {}, to: {} });
  });

  it('should pass book and empty end', () => {
    const reference: PassageReference = { book: 'GEN', to: {} };
    assert.doesNotThrow(() => {
      cleanPassageReference(reference, CanonBooks[CanonBook.Genesis], Language.English);
    });
    assert.deepEqual(reference, { book: 'Genesis', from: {}, to: {} });
  });

  it('should pass book, empty start, and empty end', () => {
    const reference: PassageReference = { book: 'GEN', from: {}, to: {} };
    assert.doesNotThrow(() => {
      cleanPassageReference(reference, CanonBooks[CanonBook.Genesis], Language.English);
    });
    assert.deepEqual(reference, { book: 'Genesis', from: {}, to: {} });
  });

  it('should pass book and start chapter', () => {
    const reference: PassageReference = { book: 'GEN', from: { chapter: 1 } };
    assert.doesNotThrow(() => {
      cleanPassageReference(reference, CanonBooks[CanonBook.Genesis], Language.English);
    });
    assert.deepEqual(reference, { book: 'Genesis', from: { chapter: 1 }, to: {} });
  });

  it('should fail book and start verse for book with more than one chapter', () => {
    const reference: PassageReference = { book: 'GEN', from: { verse: 1 } };
    assert.throws(() => {
      cleanPassageReference(reference, CanonBooks[CanonBook.Genesis], Language.English);
    });
  });

  it('should pass book and start verse for book with one chapter', () => {
    const reference: PassageReference = { book: 'OBA', from: { verse: 1 } };
    assert.doesNotThrow(() => {
      cleanPassageReference(reference, CanonBooks[CanonBook.Obadiah], Language.English);
    });
    assert.deepEqual(reference, { book: 'Obadiah', from: { verse: 1 }, to: {} });
  });

  it('should pass book, start chapter, and start verse for book with more than one chapter', () => {
    const reference: PassageReference = { book: 'GEN', from: { chapter: 1, verse: 1 } };
    assert.doesNotThrow(() => {
      cleanPassageReference(reference, CanonBooks[CanonBook.Genesis], Language.English);
    });
    assert.deepEqual(reference, { book: 'Genesis', from: { chapter: 1, verse: 1 }, to: {} });
  });

  it('should pass book, start chapter, and start verse for book with one chapter', () => {
    const reference: PassageReference = { book: 'OBA', from: { chapter: 1, verse: 1 } };
    assert.doesNotThrow(() => {
      cleanPassageReference(reference, CanonBooks[CanonBook.Obadiah], Language.English);
    });
    assert.deepEqual(reference, { book: 'Obadiah', from: { verse: 1 }, to: {} });
  });

  it('should fail book and end chapter', () => {
    const reference: PassageReference = { book: 'GEN', to: { chapter: 2 } };
    assert.throws(() => {
      cleanPassageReference(reference, CanonBooks[CanonBook.Genesis], Language.English);
    });
  });

  it('should fail book and end verse', () => {
    const reference: PassageReference = { book: 'GEN', to: { verse: 2 } };
    assert.throws(() => {
      cleanPassageReference(reference, CanonBooks[CanonBook.Genesis], Language.English);
    });
  });

  it('should fail book, end chapter, and end verse', () => {
    const reference: PassageReference = { book: 'GEN', to: { chapter: 2, verse: 2 } };
    assert.throws(() => {
      cleanPassageReference(reference, CanonBooks[CanonBook.Genesis], Language.English);
    });
  });

  it('should pass book, start chapter, and end chapter', () => {
    const reference: PassageReference = { book: 'GEN', from: { chapter: 1 }, to: { chapter: 2 } };
    assert.doesNotThrow(() => {
      cleanPassageReference(reference, CanonBooks[CanonBook.Genesis], Language.English);
    });
    assert.deepEqual(reference, { book: 'Genesis', from: { chapter: 1 }, to: { chapter: 2 } });
  });

  it('should pass book and chapters equal for book with more than one chapter', () => {
    const reference: PassageReference = { book: 'GEN', from: { chapter: 1 }, to: { chapter: 1 } };
    assert.doesNotThrow(() => {
      cleanPassageReference(reference, CanonBooks[CanonBook.Genesis], Language.English);
    });
    assert.deepEqual(reference, { book: 'Genesis', from: { chapter: 1 }, to: {} });
  });

  it('should pass book and chapters equal for book with one chapter', () => {
    const reference: PassageReference = { book: 'OBA', from: { chapter: 1 }, to: { chapter: 1 } };
    assert.doesNotThrow(() => {
      cleanPassageReference(reference, CanonBooks[CanonBook.Obadiah], Language.English);
    });
    assert.deepEqual(reference, { book: 'Obadiah', from: {}, to: {} });
  });

  it('should pass book, start chapter, and end verse', () => {
    const reference: PassageReference = { book: 'GEN', from: { chapter: 1 }, to: { verse: 2 } };
    assert.doesNotThrow(() => {
      cleanPassageReference(reference, CanonBooks[CanonBook.Genesis], Language.English);
    });
    assert.deepEqual(reference, { book: 'Genesis', from: { chapter: 1, verse: 1 }, to: { verse: 2 } });
  });

  it('should pass book, start chapter, end chapter, and end verse', () => {
    const reference: PassageReference = { book: 'GEN', from: { chapter: 1 }, to: { chapter: 2, verse: 2 } };
    assert.doesNotThrow(() => {
      cleanPassageReference(reference, CanonBooks[CanonBook.Genesis], Language.English);
    });
    assert.deepEqual(reference, { book: 'Genesis', from: { chapter: 1, verse: 1 }, to: { chapter: 2, verse: 2 } });
  });

  it('should fail book, start verse, and end chapter', () => {
    const reference: PassageReference = { book: 'GEN', from: { verse: 1 }, to: { chapter: 2 } };
    assert.throws(() => {
      cleanPassageReference(reference, CanonBooks[CanonBook.Genesis], Language.English);
    });
  });

  it('should fail book, start verse, and end verse', () => {
    const reference: PassageReference = { book: 'GEN', from: { verse: 1 }, to: { verse: 2 } };
    assert.throws(() => {
      cleanPassageReference(reference, CanonBooks[CanonBook.Genesis], Language.English);
    });
  });

  it('should fail book, start verse, end chapter, and end verse', () => {
    const reference: PassageReference = { book: 'GEN', from: { verse: 1 }, to: { chapter: 2, verse: 2 } };
    assert.throws(() => {
      cleanPassageReference(reference, CanonBooks[CanonBook.Genesis], Language.English);
    });
  });

  it('should pass book, start verse, end chapter, and end verse for book with one chapter', () => {
    const reference: PassageReference = { book: 'OBA', from: { verse: 1 }, to: { chapter: 2, verse: 2 } };
    assert.doesNotThrow(() => {
      cleanPassageReference(reference, CanonBooks[CanonBook.Obadiah], Language.English);
    });
    assert.deepEqual(reference, { book: 'Obadiah', from: { verse: 1 }, to: { verse: 2 } });
  });

  it('should fail book, start chapter, start verse, and end chapter', () => {
    const reference: PassageReference = { book: 'GEN', from: { chapter: 1, verse: 1 }, to: { chapter: 2 } };
    assert.throws(() => {
      cleanPassageReference(reference, CanonBooks[CanonBook.Genesis], Language.English);
    });
  });

  it('should pass book, start chapter, start verse, and end verse', () => {
    const reference: PassageReference = { book: 'GEN', from: { chapter: 1, verse: 1 }, to: { verse: 2 } };
    assert.doesNotThrow(() => {
      cleanPassageReference(reference, CanonBooks[CanonBook.Genesis], Language.English);
    });
    assert.deepEqual(reference, { book: 'Genesis', from: { chapter: 1, verse: 1 }, to: { verse: 2 } });
  });

  it('should pass book, start chapter, start verse, end chapter, and end verse', () => {
    const reference: PassageReference = { book: 'GEN', from: { chapter: 1, verse: 1 }, to: { chapter: 2, verse: 2 } };
    assert.doesNotThrow(() => {
      cleanPassageReference(reference, CanonBooks[CanonBook.Genesis], Language.English);
    });
    assert.deepEqual(reference, { book: 'Genesis', from: { chapter: 1, verse: 1 }, to: { chapter: 2, verse: 2 } });
  });

  it('should pass book, start chapter, and verses equal', () => {
    const reference: PassageReference = { book: 'GEN', from: { chapter: 1, verse: 1 }, to: { verse: 1 } };
    assert.doesNotThrow(() => {
      cleanPassageReference(reference, CanonBooks[CanonBook.Genesis], Language.English);
    });
    assert.deepEqual(reference, { book: 'Genesis', from: { chapter: 1, verse: 1 }, to: {} });
  });

  it('should fail book and end chapter past end of book', () => {
    const reference: PassageReference = { book: 'GEN', from: { chapter: 51 } };
    assert.throws(() => {
      cleanPassageReference(reference, CanonBooks[CanonBook.Genesis], Language.English);
    });
  });

  it('should pass book, start chapter, and end chapter past end of book', () => {
    const reference: PassageReference = { book: 'GEN', from: { chapter: 1 }, to: { chapter: 51 } };
    assert.doesNotThrow(() => {
      cleanPassageReference(reference, CanonBooks[CanonBook.Genesis], Language.English);
    });
    assert.deepEqual(reference, { book: 'Genesis', from: { chapter: 1 }, to: { chapter: 50 } });
  });

  it('should pass book, start chapter, end chapter past end of book, and end verse', () => {
    const reference: PassageReference = { book: 'GEN', from: { chapter: 1 }, to: { chapter: 51, verse: 50 } };
    assert.doesNotThrow(() => {
      cleanPassageReference(reference, CanonBooks[CanonBook.Genesis], Language.English);
    });
    assert.deepEqual(reference, { book: 'Genesis', from: { chapter: 1 }, to: { chapter: 50 } });
  });

  it('should fail book and chapter range invalid', () => {
    const reference: PassageReference = { book: 'GEN', from: { chapter: 3 }, to: { chapter: 1 } };
    assert.throws(() => {
      cleanPassageReference(reference, CanonBooks[CanonBook.Genesis], Language.English);
    });
  });

  it('should fail book and verse range invalid', () => {
    const reference: PassageReference = { book: 'GEN', from: { chapter: 1, verse: 20 }, to: { chapter: 1, verse: 1 } };
    assert.throws(() => {
      cleanPassageReference(reference, CanonBooks[CanonBook.Genesis], Language.English);
    });
  });
});

describe('formatPassageReference', () => {
  it('should format book, empty from, and empty end', () => {
    assert.equal(formatPassageReference({ book: 'Genesis', from: {}, to: {} }), 'Genesis');
  });

  it('should format book and start chapter', () => {
    assert.equal(formatPassageReference({ book: 'Genesis', from: { chapter: 1 }, to: {} }), 'Genesis 1');
  });

  it('should format book and start verse for book with one chapter', () => {
    assert.equal(formatPassageReference({ book: 'Obadiah', from: { verse: 1 }, to: {} }), 'Obadiah 1');
  });

  it('should format book, start chapter, and start verse for book with more than one chapter', () => {
    assert.equal(formatPassageReference({ book: 'Genesis', from: { chapter: 1, verse: 1 }, to: {} }), 'Genesis 1:1');
  });

  it('should format book, start chapter, and end chapter', () => {
    assert.equal(formatPassageReference({ book: 'Genesis', from: { chapter: 1 }, to: { chapter: 2 } }), 'Genesis 1-2');
  });

  it('should pass book, start chapter, start verse, and end verse', () => {
    assert.equal(
      formatPassageReference({ book: 'Genesis', from: { chapter: 1, verse: 1 }, to: { verse: 2 } }),
      'Genesis 1:1-2',
    );
  });

  it('should format book, start chapter, start verse, end chapter, and end verse', () => {
    assert.equal(
      formatPassageReference({ book: 'Genesis', from: { chapter: 1, verse: 1 }, to: { chapter: 2, verse: 2 } }),
      'Genesis 1:1-2:2',
    );
  });

  it('should format book, start verse, end chapter, and end verse for book with one chapter', () => {
    assert.equal(formatPassageReference({ book: 'Obadiah', from: { verse: 1 }, to: { verse: 2 } }), 'Obadiah 1-2');
  });
});
