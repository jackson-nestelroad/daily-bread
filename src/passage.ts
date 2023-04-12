/**
 * Options for customizing the format of returned passages.
 */
export interface PassageFormattingOptions {
  /**
   * The number of newlines to place between paragraphs.
   * Default is 2.
   *
   * If set to 0, a single space will be used to separate paragraphs.
   */
  paragraphSpacing?: number;
  /**
   * Whether or not to show verse numbers as superscript numbers.
   * Default is true.
   */
  showVerseNumbers?: boolean;
  /**
   * Whether or not to allow Unicode punctuation.
   * Default is true.
   *
   * If set to false, Unicode punctuation is converted to ASCII equivalent.
   */
  allowUnicodePunctuation?: boolean;
  /**
   * Whether or not to preserve small caps, such as "LORD".
   * Default is false.
   *
   * If set to true, small caps will show up using normal capitalization.
   */
  preserveSmallCaps?: boolean;
  /**
   * Whether or not to add the number `1` before each first verse in a chapter.
   * Default is false.
   */
  showVerseNumberForVerseOne?: boolean;
}

/**
 * Default passage options.
 */
export const DefaultPassageFormattingOptions: Required<PassageFormattingOptions> = {
  paragraphSpacing: 2,
  showVerseNumbers: true,
  allowUnicodePunctuation: true,
  preserveSmallCaps: false,
  showVerseNumberForVerseOne: false,
};

/**
 * A passage of a book of the Bible that can be printed continuously.
 */
export interface Passage {
  reference: string;
  text: string;
}
