import { Axios } from 'axios';
import * as cheerio from 'cheerio';

import { DefaultPassageFormattingOptions, Passage, PassageFormattingOptions } from './passage.js';
import { removeSuperscriptNumbers, replaceNumbersWithSuperscript, replaceSuperscriptNumber } from './util/numbers.js';
import { applyDefaults } from './util/options.js';
import { addPoetryPaddingToLine, convertUnicodePunctuationToAscii, trimWhitespace } from './util/strings.js';

enum UrlConstant {
  Home = 'https://www.biblegateway.com',
  Passage = '/passage',
  Search = '/quicksearch',
  VerseOfTheDay = '/reading-plans/verse-of-the-day/next',
  PrintInterface = 'print',
}

enum Markers {
  // Marks the beginning of a block of poetry so that poetry whitespace is not trimmed.
  PoetryStart = '___POETRYSTART___',
}

/**
 * Interface for reading the Bible from some source.
 */
export interface BibleReader {
  passages(search: string): Promise<Passage[]>;
  votd(): Promise<Passage>;
  options: PassageFormattingOptions;
}

/**
 * Web scraper for the Bible Gateway website.
 */
export class BibleGatewayWebScraper implements BibleReader {
  /**
   * Constructs a new web scraper for the given version and formatting options.
   *
   * If you wish to change these options, simply construct a new instance of this class.
   * @param version Version abbreviation.
   * @param options Formatting options.
   */
  public constructor(
    private version: string,
    public options: PassageFormattingOptions = DefaultPassageFormattingOptions,
  ) {
    this.axios = new Axios({
      baseURL: UrlConstant.Home,
    });
    applyDefaults(this.options, DefaultPassageFormattingOptions);
  }

  /**
   * Searches Bible Gateway for one or more Bible passages.
   *
   * Multiple passages can be searched by separating them with a semicolon (`;`).
   *
   * The format of returned passages is based on the options set in the constructor.
   * @param search String of reference passages.
   * @returns Array of passages.
   */
  public async passages(search: string): Promise<Passage[]> {
    const response = await this.axios.request({
      method: 'get',
      url: UrlConstant.Passage,
      params: {
        search,
        version: this.version,
        interface: UrlConstant.PrintInterface,
      },
    });

    const $ = cheerio.load(response.data);
    const passages = $('.passage-col')
      .map((i, el) => {
        return this.parsePassage($, el);
      })
      .toArray();

    return passages;
  }

  /**
   * Returns the verse of the day from Bible Gateway.
   * @returns Verse of the day.
   */
  public async votd(): Promise<Passage> {
    const response = await this.axios.request({
      method: 'get',
      url: UrlConstant.VerseOfTheDay,
      params: {
        version: this.version,
        interface: UrlConstant.PrintInterface,
      },
    });

    const $ = cheerio.load(response.data);
    return this.parsePassage($, $('.rp-passage').get(0), true);
  }

  private parsePassage($: cheerio.CheerioAPI, el: cheerio.Element, readingPlan: boolean = false): Passage {
    const passage = $(el);

    const reference = passage.find(readingPlan ? 'div.rp-passage-display' : 'div.bcv').text();

    // Remove headers, links, cross references, footnotes, various dropdowns, and translation notes.
    passage.find('h1, h2, h3, h4').remove();
    passage.find('a.full-chap-link, a.bibleref').remove();
    passage.find('sup.crossreference, sup.footnote').remove();
    passage.find('div.footnotes, div.dropdowns, div.crossrefs, div.passage-other-trans, div.il-text').remove();
    passage.find('p.translation-note').remove();
    passage.find('crossref').remove();

    if (readingPlan) {
      passage.find('div.rp-passage-display-wrapper').remove();
    }

    passage.find('span.chapternum').each((i, el) => {
      const chapterNum = $(el);
      if (this.options.showVerseNumberForVerseOne) {
        $('<sup class="versenum">1 </sup>').insertAfter(chapterNum);
      }
      if (this.options.showChapterNumbers) {
        $(`<p>(Ch ${chapterNum.text().trim()}) </p>`).insertAfter(chapterNum);
      }
      chapterNum.remove();
    });

    // Replace line breaks with newlines.
    passage.find('br').replaceWith('\n');

    // Replace all verse numbers with superscript numbers.
    // The passage separator allows us to know where each verse separates.
    passage.find('sup.versenum').each((i, el) => {
      const num = $(el);
      num.replaceWith(replaceNumbersWithSuperscript(num.text()));
    });

    if (this.options.preserveSmallCaps) {
      passage.find('span.small-caps').each((i, el) => {
        const smallCaps = $(el);
        smallCaps.replaceWith(smallCaps.text().toLocaleUpperCase());
      });
    }

    // Preserve poetry spacing.
    passage.find('div.poetry').each((i, el) => {
      const poetry = $(el);
      let lines = poetry
        .text()
        .split('\n')
        // Use padding of 4, because the maxiumum verse number is three digits long.
        .map(line => addPoetryPaddingToLine(line, 4));

      // After this point, we lose information about which lines are intended to be poetry.
      // While we have this information, replace superscript numbers with spaces to keep the padding.
      if (!this.options.showVerseNumbers) {
        lines = lines.map(line => replaceSuperscriptNumber(line, ' '));
      }

      poetry.replaceWith(`<p>${Markers.PoetryStart}${lines.join('\n')}</p>`);
    });

    // Preserve paragraph paragraph spacing.
    passage.find('p').each((i, el) => {
      const paragraph = $(el);
      paragraph.replaceWith(
        `${this.options.paragraphSpacing === 0 ? ' ' : '\n'.repeat(this.options.paragraphSpacing)}${paragraph.text()}`,
      );
    });

    // Put the text all together.
    // Remove non-breaking spaces.
    // Remove spaces that precede a newline. These occur because there are spaces between paragraph tags in the HTML.
    let text = passage.text().replace(/\xA0/g, ' ').replace(/ +\n/g, '\n');

    text = trimWhitespace(text);
    text = text.replace(new RegExp(Markers.PoetryStart, 'g'), '');

    if (!this.options.showVerseNumbers) {
      text = removeSuperscriptNumbers(text);
    }
    if (!this.options.allowUnicodePunctuation) {
      text = convertUnicodePunctuationToAscii(text);
    }

    return { reference, text };
  }

  private axios: InstanceType<typeof Axios>;
}
