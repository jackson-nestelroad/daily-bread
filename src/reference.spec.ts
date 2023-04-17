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

  it('should parse psalm 151', () => {
    assert.deepEqual(parsePassageReferences('Psalm 151, psalm151 1-2'), [
      {
        book: 'Psalm 151',
        from: {},
        to: {},
      },
      {
        book: 'psalm151',
        from: { chapter: 1 },
        to: { chapter: 2 },
      },
    ]);
  });
});

describe('cleanPassageReference', () => {
  it('should clean references in books with multiple chapters', () => {
    const testCases: { input: PassageReference; pass: boolean; output?: PassageReference }[] = [
      {
        input: {} as PassageReference,
        pass: true,
        output: { book: 'Genesis', from: {}, to: {} },
      },
      {
        input: { book: 'GEN' },
        pass: true,
        output: { book: 'Genesis', from: {}, to: {} },
      },
      {
        input: { book: 'GEN', from: {} },
        pass: true,
        output: { book: 'Genesis', from: {}, to: {} },
      },
      {
        input: { book: 'GEN', from: { chapter: 1 } },
        pass: true,
        output: { book: 'Genesis', from: { chapter: 1 }, to: {} },
      },
      {
        input: { book: 'GEN', from: { chapter: 51 } },
        pass: false,
      },
      {
        input: { book: 'GEN', from: { verse: 2 } },
        pass: false,
      },
      {
        input: { book: 'GEN', from: { chapter: 1, verse: 2 } },
        pass: true,
        output: { book: 'Genesis', from: { chapter: 1, verse: 2 }, to: {} },
      },
      {
        input: { book: 'GEN', to: {} },
        pass: true,
        output: { book: 'Genesis', from: {}, to: {} },
      },
      {
        input: { book: 'GEN', to: { chapter: 3 } },
        pass: false,
      },
      {
        input: { book: 'GEN', to: { verse: 4 } },
        pass: false,
      },
      {
        input: { book: 'GEN', to: { chapter: 3, verse: 4 } },
        pass: false,
      },
      {
        input: { book: 'GEN', from: {}, to: {} },
        pass: true,
        output: { book: 'Genesis', from: {}, to: {} },
      },
      {
        input: { book: 'GEN', from: { chapter: 1 }, to: { chapter: 3 } },
        pass: true,
        output: { book: 'Genesis', from: { chapter: 1 }, to: { chapter: 3 } },
      },
      {
        input: { book: 'GEN', from: { chapter: 3 }, to: { chapter: 1 } },
        pass: false,
      },
      {
        input: { book: 'GEN', from: { chapter: 1 }, to: { chapter: 1 } },
        pass: true,
        output: { book: 'Genesis', from: { chapter: 1 }, to: {} },
      },
      {
        input: { book: 'GEN', from: { chapter: 1 }, to: { chapter: 51 } },
        pass: true,
        output: { book: 'Genesis', from: { chapter: 1 }, to: { chapter: 50 } },
      },
      {
        input: { book: 'GEN', from: { verse: 1 }, to: { verse: 3 } },
        pass: false,
      },
      {
        input: { book: 'GEN', from: { verse: 3 }, to: { verse: 1 } },
        pass: false,
      },
      {
        input: { book: 'GEN', from: { verse: 1 }, to: { verse: 1 } },
        pass: false,
      },
      {
        input: { book: 'GEN', from: { chapter: 1, verse: 2 }, to: { chapter: 3, verse: 4 } },
        pass: true,
        output: { book: 'Genesis', from: { chapter: 1, verse: 2 }, to: { chapter: 3, verse: 4 } },
      },
      {
        input: { book: 'GEN', from: { chapter: 1 }, to: { chapter: 3, verse: 4 } },
        pass: true,
        output: { book: 'Genesis', from: { chapter: 1, verse: 1 }, to: { chapter: 3, verse: 4 } },
      },
      {
        input: { book: 'GEN', from: { chapter: 1, verse: 2 }, to: { chapter: 3 } },
        pass: false,
      },
      {
        input: { book: 'GEN', from: { chapter: 1, verse: 2 }, to: { chapter: 1, verse: 4 } },
        pass: true,
        output: { book: 'Genesis', from: { chapter: 1, verse: 2 }, to: { verse: 4 } },
      },
      {
        input: { book: 'GEN', from: { chapter: 1, verse: 2 }, to: { chapter: 1, verse: 1 } },
        pass: false,
      },
    ];
    for (const testCase of testCases) {
      const original = JSON.stringify(testCase.input);
      (testCase.pass ? assert.doesNotThrow : assert.throws)(
        () => {
          cleanPassageReference(testCase.input, CanonBooks[CanonBook.Genesis], Language.English);
        },
        undefined,
        undefined,
        `Expected function to ${testCase.pass ? 'pass' : 'fail'} for input ${original}`,
      );
      if (testCase.pass && testCase.output) {
        assert.deepEqual(
          testCase.input,
          testCase.output,
          `Expected ${original} to be converted to ${JSON.stringify(testCase.output)}`,
        );
      }
    }
  });

  it('should clean references in books with one chapter', () => {
    const testCases: { input: PassageReference; pass: boolean; output?: PassageReference }[] = [
      {
        input: {} as PassageReference,
        pass: true,
        output: { book: 'Obadiah', from: {}, to: {} },
      },
      {
        input: { book: 'OBA' },
        pass: true,
        output: { book: 'Obadiah', from: {}, to: {} },
      },
      {
        input: { book: 'OBA', from: {} },
        pass: true,
        output: { book: 'Obadiah', from: {}, to: {} },
      },
      {
        input: { book: 'OBA', from: { chapter: 1 } },
        pass: true,
        output: { book: 'Obadiah', from: {}, to: {} },
      },
      {
        input: { book: 'OBA', from: { chapter: 51 } },
        pass: true,
        output: { book: 'Obadiah', from: { verse: 51 }, to: {} },
      },
      {
        input: { book: 'OBA', from: { verse: 2 } },
        pass: true,
        output: { book: 'Obadiah', from: { verse: 2 }, to: {} },
      },
      {
        input: { book: 'OBA', from: { chapter: 1, verse: 2 } },
        pass: true,
        output: { book: 'Obadiah', from: { verse: 2 }, to: {} },
      },
      {
        input: { book: 'OBA', to: {} },
        pass: true,
        output: { book: 'Obadiah', from: {}, to: {} },
      },
      {
        input: { book: 'OBA', to: { chapter: 3 } },
        pass: true,
        output: { book: 'Obadiah', from: { verse: 1 }, to: { verse: 3 } },
      },
      {
        input: { book: 'OBA', to: { verse: 4 } },
        pass: true,
        output: { book: 'Obadiah', from: { verse: 1 }, to: { verse: 4 } },
      },
      {
        input: { book: 'OBA', to: { chapter: 3, verse: 4 } },
        pass: true,
        output: { book: 'Obadiah', from: { verse: 1 }, to: { verse: 3 } },
      },
      {
        input: { book: 'OBA', from: {}, to: {} },
        pass: true,
        output: { book: 'Obadiah', from: {}, to: {} },
      },
      {
        input: { book: 'OBA', from: { chapter: 1 }, to: { chapter: 3 } },
        pass: true,
        output: { book: 'Obadiah', from: { verse: 1 }, to: { verse: 3 } },
      },
      {
        input: { book: 'OBA', from: { chapter: 3 }, to: { chapter: 1 } },
        pass: true,
        output: { book: 'Obadiah', from: { verse: 3 }, to: {} },
      },
      {
        input: { book: 'OBA', from: { chapter: 1 }, to: { chapter: 1 } },
        pass: true,
        output: { book: 'Obadiah', from: {}, to: {} },
      },
      {
        input: { book: 'OBA', from: { chapter: 1 }, to: { chapter: 51 } },
        pass: true,
        output: { book: 'Obadiah', from: { verse: 1 }, to: { verse: 51 } },
      },
      {
        input: { book: 'OBA', from: { verse: 1 }, to: { verse: 3 } },
        pass: true,
        output: { book: 'Obadiah', from: { verse: 1 }, to: { verse: 3 } },
      },
      {
        input: { book: 'OBA', from: { verse: 3 }, to: { verse: 1 } },
        pass: false,
      },
      {
        input: { book: 'OBA', from: { verse: 1 }, to: { verse: 1 } },
        pass: true,
        output: { book: 'Obadiah', from: { verse: 1 }, to: {} },
      },
      {
        input: { book: 'OBA', from: { chapter: 1, verse: 2 }, to: { chapter: 3, verse: 4 } },
        pass: true,
        output: { book: 'Obadiah', from: { verse: 2 }, to: { verse: 3 } },
      },
      {
        input: { book: 'OBA', from: { chapter: 1 }, to: { chapter: 3, verse: 4 } },
        pass: true,
        output: { book: 'Obadiah', from: { verse: 1 }, to: { verse: 3 } },
      },
      {
        input: { book: 'OBA', from: { chapter: 1, verse: 2 }, to: { chapter: 3 } },
        pass: true,
        output: { book: 'Obadiah', from: { verse: 2 }, to: { verse: 3 } },
      },
      {
        input: { book: 'OBA', from: { chapter: 1, verse: 2 }, to: { chapter: 1, verse: 4 } },
        pass: true,
        output: { book: 'Obadiah', from: { verse: 2 }, to: { verse: 4 } },
      },
      {
        input: { book: 'OBA', from: { chapter: 1, verse: 2 }, to: { chapter: 1, verse: 1 } },
        pass: false,
      },
    ];
    for (const testCase of testCases) {
      const original = JSON.stringify(testCase.input);
      (testCase.pass ? assert.doesNotThrow : assert.throws)(
        () => {
          cleanPassageReference(testCase.input, CanonBooks[CanonBook.Obadiah], Language.English);
        },
        undefined,
        undefined,
        `Expected function to ${testCase.pass ? 'pass' : 'fail'} for input ${original}`,
      );
      if (testCase.pass && testCase.output) {
        assert.deepEqual(
          testCase.input,
          testCase.output,
          `Expected ${original} to be converted to ${JSON.stringify(testCase.output)}`,
        );
      }
    }
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
