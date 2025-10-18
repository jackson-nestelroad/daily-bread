import { BookData } from './bible.js';
import { findBook } from './books.js';
import { DefaultPassageFormattingOptions, Passage, PassageFormattingOptions } from './passage.js';
import {
  PassageReference,
  cleanPassageReference,
  formatPassageReference,
  parsePassageReferences,
} from './reference.js';
import {
  BibleGatewayWebScraper,
  BibleGatewayWebScraperOptions,
  BibleReader,
  DefaultBibleGatewayWebScraperOptions,
} from './scraper.js';
import { splitRange } from './util/numbers.js';
import { applyDefaults } from './util/options.js';
import { DefaultVersion, VersionData, findVersion } from './versions.js';

/**
 * The type for getting a single passage of the Bible.
 */
export type GetSingleType = string | PassageReference;

/**
 * The type for getting one or more passages of the Bible.
 */
export type GetType = GetSingleType | GetSingleType[];

/**
 * Options for getting passages.
 */
export interface GetOptions {
  /**
   * Whether or not reject the whole operation if a single passage fails.
   * Default is false.
   *
   * If enabled, when a passage fails, the whole operation fails.
   * If disabled, when a passage fails, it is ignored, and all successful passages are still returned.
   */
  strict?: boolean;
}

/**
 * Default passage options.
 */
export const DefaultGetOptions: Required<GetOptions> = {
  strict: false,
};

/**
 * API for reading the Bible.
 *
 * The current implementation reads from Bible Gateway.
 */
export class DailyBread {
  /**
   * Constructs a new object for reading the Bible.
   */
  public constructor() {
    this.setVersion(DefaultVersion);
  }

  /**
   * Checks if the given version of the Bible is supported by the API.
   *
   * A version unsupported by the API may be supported by Bible Gateway. If you want to use an unsupported version, use
   * `BibleGatewayWebScraper` directly, which can read any version directly from the website.
   * @param abbreviation Version abbreviation (e.g., NIV, ESV, MSG, etc.).
   * @returns Version is supported?
   */
  public isSupportedVersion(abbreviation: string): boolean {
    return findVersion(abbreviation) !== null;
  }

  /**
   * Gets the current version of the Bible used for reading.
   * @returns Version data.
   */
  public getVersion(): VersionData {
    return this.version;
  }

  /**
   * Sets the version to be used when reading the Bible.
   * @param abbreviation Version abbreviation (e.g., NIV, ESV, MSG, etc.).
   */
  public setVersion(abbreviation: string): void {
    const version = findVersion(abbreviation);
    if (!version) {
      throw new Error(`${abbreviation} is not supported by the BibleGateway library`);
    }
    this.version = version;
    this.resetScraper();
  }

  /**
   * Sets the formatting options for returned passages.
   * @param options Formatting options.
   */
  public setFormatting(options: PassageFormattingOptions): void {
    this.scraper.options = options;
    this.resetScraper();
  }

  /**
   * Sets options specific to the Bible Gateway scraper.
   * @param options Bible Gateway options.
   */
  public setBibleGatewayOptions(options: BibleGatewayWebScraperOptions): void {
    this.bibleGatewayScraperOptions = options;
    this.resetScraper();
  }

  /**
   * Returns data for a book of the Bible.
   *
   * Books may be searched by name (case insensitive), abbreviation, or alias.
   * @param book Name of the book.
   * @returns `BookData`, or `null` if not found.
   */
  public getBook(book: string): BookData | null {
    return findBook(book, this.version.language, this.version.deuterocanon);
  }

  /**
   * Gets one passage of the Bible.
   * @param passage Passage to search for.
   * @returns A single passage.
   */
  public async getOne(passage: GetSingleType): Promise<Passage> {
    const references = this.getPassageReferenceFromUserInput(passage);
    if (references.length === 0) {
      throw new Error('Passage not found');
    }
    const passages = await this.getPassages([references[0]], { strict: true });
    if (passages.length === 0) {
      throw new Error('Passage not found');
    }
    return passages[0];
  }

  /**
   * Gets one or more passages of the Bible.
   *
   * The `passage` parameter can be a string, a `PassageReference` object, or an array of strings and `PassageReference`
   * objects.
   *
   * Returns an empty array if no passages are found, unless strict mode is enabled (see `GetOptions`).
   * @param passage Passages to search for.
   * @param options Passage options.
   * @returns An array of passages.
   */
  public async get(passage: GetType, options: GetOptions = {}): Promise<Passage[]> {
    return await this.getPassages(this.getPassageReferenceFromUserInput(passage), options);
  }

  /**
   * Returns the verse of the day.
   * @returns Verse of the day.
   */
  public async votd(): Promise<Passage> {
    return await this.scraper.votd();
  }

  private getPassageReferenceFromUserInput(passage: GetType): PassageReference[] {
    if (typeof passage === 'string') {
      return parsePassageReferences(passage);
    } else if (typeof passage === 'object') {
      if (Array.isArray(passage)) {
        return passage
          .map(passage => {
            if (typeof passage === 'string') {
              return parsePassageReferences(passage);
            }
            return passage;
          })
          .flat();
      } else {
        return [passage];
      }
    }
  }

  private async getPassages(passages: PassageReference[], options: GetOptions): Promise<Passage[]> {
    applyDefaults(options, DefaultGetOptions);
    const promises = passages.map(passage => this.getPassage(passage));
    if (options.strict) {
      return await Promise.all(promises);
    }

    const settled = await Promise.allSettled(promises);
    // Only return passages that yielded a result. Errors are ignored.
    return settled
      .filter(promise => promise.status === 'fulfilled')
      .map(promise => (promise as PromiseFulfilledResult<Passage>).value);
  }

  private async getPassage(passage: PassageReference): Promise<Passage> {
    const book = findBook(passage.book, this.version.language, this.version.deuterocanon);
    if (!book) {
      throw new Error(`Book not found: ${passage.book}`);
    }

    // Create the formatted passage reference ourselves, since there will be multiple calls to the scraper.
    cleanPassageReference(passage, book, this.version.language);
    const reference = formatPassageReference(passage);

    let startChapter = passage.from?.chapter ?? 1;
    let endChapter = passage.to?.chapter ?? passage.from?.chapter ?? book.chapters;

    const startVerse = passage.from?.verse ?? 1;
    const endVerse = passage.to?.verse ?? passage.from?.verse ?? DailyBread.MaxVerseNumber;

    const promises: Promise<Passage[]>[] = [];
    if (startChapter === endChapter) {
      // Our passage resides in one chapter, just make a single call to the scraper.
      promises.push(this.scraper.passages(`${passage.book} ${startChapter}:${startVerse}-${endVerse}`));
    } else {
      let index = 0;

      // If we are getting a partial part of the start or end chapter, get them separately.
      // If not, include them in how we split the chapter into multple ranges to fetch.

      if (startVerse !== 1) {
        promises.push(
          this.scraper.passages(`${passage.book} ${startChapter}:${startVerse}-${DailyBread.MaxVerseNumber}`),
        );
        ++startChapter;
        ++index;
      }
      if (endVerse !== DailyBread.MaxVerseNumber) {
        promises.push(this.scraper.passages(`${passage.book} ${endChapter}:1-${endVerse}`));
        --endChapter;
      }

      const chapterRanges = splitRange([startChapter, endChapter], DailyBread.ChaptersPerCall);
      promises.splice(
        index,
        0,
        ...chapterRanges.map(([a, b]) => this.scraper.passages(`${passage.book} ${a === b ? a : `${a}-${b}`}`)),
      );
    }

    const passages = await Promise.all(promises);

    // If any of our requests resulted in no passages, something went wrong.
    if (passages.some(passage => passage.length === 0)) {
      throw new Error('Passage not found');
    }

    // Join the text together to make one large passage.
    const text = passages
      .map(passage => passage[0].text)
      .join('\n'.repeat(this.scraper.options?.paragraphSpacing ?? DefaultPassageFormattingOptions.paragraphSpacing));
    return { reference, text };
  }

  private resetScraper() {
    this.scraper = new BibleGatewayWebScraper(
      this.version.abbreviation,
      this.scraper?.options,
      this.bibleGatewayScraperOptions,
    );
  }

  private static readonly MaxVerseNumber = 200;
  private static readonly ChaptersPerCall = 5;

  private bibleGatewayScraperOptions: BibleGatewayWebScraperOptions = DefaultBibleGatewayWebScraperOptions;
  private scraper: BibleReader;
  private version: VersionData;
}
