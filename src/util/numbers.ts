/**
 * Binds the given number `n` to the inclusive range `[low, high]`.
 * If `n < low`, the result is `low`.
 * If `n > high`, the result is `high`.
 * Else, `n` is returned unchanged.
 * @param n Number.
 * @param [low, high] Inclusive range.
 * @returns Number in range `[low, high]`.
 */
export function bindNumberToRange(n: number, [low, high]: [number, number]): number {
  if (n < low) {
    return low;
  }
  if (n > high) {
    return high;
  }
  return n;
}

export const SuperscriptNumbers: { [char: string]: string } = {
  '0': '\u{2070}',
  '1': '\u{00B9}',
  '2': '\u{00B2}',
  '3': '\u{00B3}',
  '4': '\u{2074}',
  '5': '\u{2075}',
  '6': '\u{2076}',
  '7': '\u{2077}',
  '8': '\u{2078}',
  '9': '\u{2079}',
};

const SuperscriptWithSpaceRegex = new RegExp(`[${Object.values(SuperscriptNumbers).join('')}]+\\s?`, 'g');

/**
 * Replaces numbers in the given string with their superscript equivalent.
 * @param str String.
 * @returns String with Unicode superscript numbers.
 */
export function replaceNumbersWithSuperscript(str: string): string {
  return str.replace(/\d/g, m => SuperscriptNumbers[m]);
}

/**
 * Removes all superscript numbers from the given string completely.
 *
 * Trailing spaces are also removed, since verse numbers always have a trailing space to separate from the verse itself.
 * @param str String.
 * @returns String with Unicode superscript numbers removed.
 */
export function removeSuperscriptNumbers(str: string): string {
  return str.replace(SuperscriptWithSpaceRegex, '');
}

const SuperscriptRegex = new RegExp(`[${Object.values(SuperscriptNumbers).join('')}]`, 'g');

/**
 * Replaces all superscript numbers with the given character.
 * @param str String.
 * @param replacement Replacement string.
 * @returns String with Unicode superscript numbers replaced.
 */
export function replaceSuperscriptNumber(str: string, replacement: string): string {
  return str.replace(SuperscriptRegex, replacement);
}

/**
 * Splits the range `[start, end]` (both inclusive) into chunks of size `chunkSize`.
 * @param range Range of numbers, both inclusive.
 * @param chunkSize Size of chunks.
 * @returns 2D array of numeric ranges.
 */
export function splitRange([start, end]: [number, number], chunkSize: number): [number, number][] {
  const ranges: [number, number][] = [];
  while (end - start + 1 > chunkSize) {
    ranges.push([start, start + chunkSize - 1]);
    start += chunkSize;
  }
  if (start <= end) {
    ranges.push([start, end]);
  }
  return ranges;
}
