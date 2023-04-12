import { findBook } from './books';
import { DefaultPassageFormattingOptions, Passage, PassageFormattingOptions } from './passage';
import { PassageReference, cleanPassageReference, formatPassageReference, parsePassageReferences } from './reference';
import { BibleGatewayWebScraper } from './scraper';
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
   * Gets one passage of the Bible.
   * @param passage Passage to search for.
   * @returns A single passage.
   */
  public async getOne(passage: GetSingleType): Promise<Passage> {
    const passages = await this.get(passage);
    return passages[0];
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
    if (typeof passage === 'string') {
      const passages = parsePassageReferences(passage);
      return await this.getPassages(passages);
    } else if (typeof passage === 'object') {
      if (Array.isArray(passage)) {
        return await this.getPassages(
          passage
            .map(passage => {
              if (typeof passage === 'string') {
                return parsePassageReferences(passage);
              }
              return passage;
            })
            .flat(),
        );
      } else {
        return await this.getPassages([passage]);
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

    const endChapter = passage.to?.chapter ?? passage.from?.chapter ?? book.chapters;
    const startChapter = passage.from?.chapter ?? 1;
    const startVerse = passage.from?.verse ?? 1;
    const endVerse = passage.to?.verse ?? passage.from?.verse ?? DailyBread.MaxVerseNumber;

    const promises: Promise<Passage[]>[] = [];
    if (startChapter === endChapter) {
      // Our passage resides in one chapter, just make a single call to the scraper.
      promises.push(this.scraper.passages(`${passage.book} ${startChapter}:${startVerse}-${endVerse}`));
    } else {
      // Our passage spans multiple chapters.
      // Get the verse range in first chapter, all the chapters in between, and the verse range in the last chapter.
      promises.push(
        this.scraper.passages(`${passage.book} ${startChapter}:${startVerse}-${DailyBread.MaxVerseNumber}`),
      );
      const chapterRanges = splitRange([startChapter + 1, endChapter - 1], DailyBread.ChaptersPerCall);
      promises.push(...chapterRanges.map(([a, b]) => this.scraper.passages(`${passage.book} ${a}-${b}`)));
      promises.push(this.scraper.passages(`${passage.book} ${endChapter}:1-${endVerse}`));
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
  private static readonly ChaptersPerCall = 4;

  private scraper: BibleGatewayWebScraper;
  private version: VersionData;
}
