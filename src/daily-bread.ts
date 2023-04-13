import { BookData } from './bible';
import { findBook } from './books';
import { DefaultPassageFormattingOptions, Passage, PassageFormattingOptions } from './passage';
import { PassageReference, cleanPassageReference, formatPassageReference, parsePassageReferences } from './reference';
import { BibleGatewayWebScraper, BibleReader } from './scraper';
import { splitRange } from './util/numbers';
import { DefaultVersion, VersionData, findVersion } from './versions';

/**
 * The type for getting a single passage of the Bible.
 */
export type GetSingleType = string | PassageReference;

/**
 * The type for getting one or more passages of the Bible.
 */
export type GetType = GetSingleType | GetSingleType[];

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
    const passages = await this.getPassages(references.length > 0 ? [references[0]] : []);
    return passages?.[0] ?? null;
  }

  /**
   * Gets one or more passages of the Bible.
   *
   * The `passage` parameter can be a string, a `PassageReference` object, or an array of strings and `PassageReference`
   * objects.
   * @param passage Passages to search for.
   * @returns An array of passages.
   */
  public async get(passage: GetType): Promise<Passage[]> {
    return await this.getPassages(this.getPassageReferenceFromUserInput(passage));
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

  private async getPassages(passages: PassageReference[]): Promise<Passage[]> {
    const promises = passages.map(passage => this.getPassage(passage));
    return await Promise.all(promises);
  }

  private async getPassage(passage: PassageReference): Promise<Passage> {
    const book = findBook(passage.book, this.version.language);
    if (!book) {
      throw new Error(`Invalid book: ${passage.book}`);
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

    // Join the text together to make one large passage.
    const text = passages
      .map(passage => passage[0].text)
      .join('\n'.repeat(this.scraper.options?.paragraphSpacing ?? DefaultPassageFormattingOptions.paragraphSpacing));
    return { reference, text };
  }

  private resetScraper() {
    this.scraper = new BibleGatewayWebScraper(this.version.abbreviation, this.scraper?.options);
  }

  private static readonly MaxVerseNumber = 200;
  private static readonly ChaptersPerCall = 5;

  private scraper: BibleReader;
  private version: VersionData;
}
