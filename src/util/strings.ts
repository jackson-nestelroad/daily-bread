import { SuperscriptNumbers } from './numbers.js';

const WhitespaceRegex = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

/**
 * Trims whitespace from the string using a regular expression.
 *
 * A bit stronger than `String.prototype.trim`.
 * @param str String.
 * @returns Trimmed string.
 */
export function trimWhitespace(str: string): string {
  return str.replace(WhitespaceRegex, '');
}

const UnicodePunctuation: { [char: string]: string } = {
  '\u{201C}': '"',
  '\u{201D}': '"',
  '\u{201F}': '"',
  '\u{2018}': "'",
  '\u{2019}': "'",
  '\u{2013}': '-',
  '\u{2014}': '-',
};

const UnicodePunctuationRegex = new RegExp(`[${Object.keys(UnicodePunctuation).join('')}]`, 'g');

/**
 * Converts common Unicode punctuation to their ASCII equivalent.
 * @param str String.
 * @returns String with translated punctuation.
 */
export function convertUnicodePunctuationToAscii(str: string): string {
  return str.replace(UnicodePunctuationRegex, m => UnicodePunctuation[m]);
}

const PoetryPaddingRegex = new RegExp(`^([${Object.values(SuperscriptNumbers).join('')}]+)?\\s*`);

/**
 * Adds spaces to the beginning of a line, or after the verse number if it is present, until the text is located after
 * `width` spaces in the string.
 *
 * Strings without a verse number that already have the full padding are indented half `width`, since they are intended
 * to be indented.
 *
 * Used for formatting lines of poetry.
 * @param line Line of poetry.
 * @param spaces Number of spaces to pad.
 * @returns Formatted line with inserted lines.
 */
export function addPoetryPaddingToLine(line: string, width: number): string {
  const match = line.match(PoetryPaddingRegex);
  const existingPadding = match?.[0] ?? '';
  let spacesToAdd = 0;
  if (!match[1] && existingPadding.length === width) {
    spacesToAdd = Math.floor(width / 2);
  } else if (existingPadding.length < width) {
    spacesToAdd = width - existingPadding.length;
  }
  return `${line.substring(0, existingPadding.length)}${' '.repeat(spacesToAdd)}${line.substring(
    existingPadding.length,
  )}`;
}
