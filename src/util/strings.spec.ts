import { assert } from 'chai';

import { addPoetryPaddingToLine, convertUnicodePunctuationToAscii, trimWhitespace } from './strings';

describe('trimWhitespace', () => {
  it('should trim regular whitespace', () => {
    assert.equal(trimWhitespace(' \n\t\r\vline 1\nline 2 \v\r\t\n '), 'line 1\nline 2');
  });

  it('should trim non-breaking spaces', () => {
    assert.equal(trimWhitespace('\xA0test\xA0'), 'test');
    assert.equal(trimWhitespace('\u{00A0}test 2\u{00A0}'), 'test 2');
  });
});

describe('convertUnicodePunctuationToAscii', () => {
  it('should replace unicode double quotes', () => {
    assert.equal(convertUnicodePunctuationToAscii('“Hello, world!”'), '"Hello, world!"');
  });

  it('should replace single quotes', () => {
    assert.equal(
      convertUnicodePunctuationToAscii('“The program said, \u{2018}Hello, world!\u{2019}”'),
      '"The program said, \'Hello, world!\'"',
    );
  });

  it('should replace dashes', () => {
    assert.equal(
      convertUnicodePunctuationToAscii('Ahishar\u{2014}palace administrator'),
      'Ahishar-palace administrator',
    );
  });
});

describe('addPoetryPaddingToLine', () => {
  it('should add spaces to beginning of line', () => {
    assert.equal(addPoetryPaddingToLine('Line of poetry', 2), '  Line of poetry');
    assert.equal(addPoetryPaddingToLine('  Second line', 4), '    Second line');
  });

  it('should indent halfway lines with full space padding', () => {
    assert.equal(addPoetryPaddingToLine('  Indented line', 2), '   Indented line');
    assert.equal(addPoetryPaddingToLine('    Another indented line', 4), '      Another indented line');
  });

  it('should add correct number of spaces after verse number', () => {
    assert.equal(addPoetryPaddingToLine('\u{00B9}\u{00B2} Verse 1', 4), '\u{00B9}\u{00B2}  Verse 1');
    assert.equal(addPoetryPaddingToLine('\u{2078} Verse 2', 4), '\u{2078}   Verse 2');
    assert.equal(addPoetryPaddingToLine('\u{2078}  Verse 3', 4), '\u{2078}   Verse 3');
    assert.equal(addPoetryPaddingToLine('\u{2078}   Verse 4', 4), '\u{2078}   Verse 4');
    assert.equal(addPoetryPaddingToLine('\u{2078}    Verse 5', 4), '\u{2078}    Verse 5');
    assert.equal(addPoetryPaddingToLine('\u{00B9}\u{00B2}\u{2077} Verse 6', 4), '\u{00B9}\u{00B2}\u{2077} Verse 6');
    assert.equal(
      addPoetryPaddingToLine('\u{00B9}\u{00B2}\u{2077}\u{2070} Verse 7', 4),
      '\u{00B9}\u{00B2}\u{2077}\u{2070} Verse 7',
    );
  });
});
