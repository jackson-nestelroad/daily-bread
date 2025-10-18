#!/usr/bin/env node
import { exit } from 'process';
import yargs, { Argv } from 'yargs';
import { hideBin } from 'yargs/helpers';

import { Language, LanguageNames } from '../src/bible.js';
import {
  Canon,
  CanonicalOrder,
  Category,
  DailyBread,
  DeuterocanonicalOrder,
  Testament,
  Versions,
  findBook,
} from '../src/index.js';

enum DailyBreadOptions {
  Version = 'version',
  ShowVerseNumbers = 'verse-numbers',
  ShowChapterNumbers = 'chapter-numbers',
  UseHomepageForVotd = 'use-homepage-for-votd',
}

interface DailyBreadCreationOptions {
  version?: string;
  showVerseNumbers?: boolean;
  showChapterNumbers?: boolean;
  useHomepageForVotd?: boolean;
}

function runCommand(fn: () => Promise<void>) {
  fn().catch(err => {
    console.error(err.message ?? err);
    exit(1);
  });
}

function createDailyBread(options: DailyBreadCreationOptions): DailyBread {
  const bible = new DailyBread();
  if (options.version) {
    if (!bible.isSupportedVersion(options.version)) {
      throw new Error('Unsupported version ' + options.version);
    }
    bible.setVersion(options.version);
  }
  bible.setFormatting({
    showVerseNumbers: options.showVerseNumbers ?? false,
    showChapterNumbers: options.showChapterNumbers ?? false,
  });
  bible.setBibleGatewayOptions({
    useHomepageToReadVerseOfTheDay: options.useHomepageForVotd ?? false,
  });
  return bible;
}

function passageCommandOptions<T>(yargs: Argv<T>) {
  return yargs
    .options(DailyBreadOptions.ShowVerseNumbers, {
      alias: 'n',
      type: 'boolean',
      describe: 'Show verse numbers?',
      default: true,
    })
    .options(DailyBreadOptions.ShowChapterNumbers, {
      alias: 'c',
      type: 'boolean',
      describe: 'Show chapter numbers?',
      default: true,
    })
    .options(DailyBreadOptions.UseHomepageForVotd, {
      type: 'boolean',
      describe: 'Use Bible Gateway homepage for reading Verse of the Day?',
      default: false,
    });
}

yargs(hideBin(process.argv))
  .version(false)
  .options(DailyBreadOptions.Version, {
    alias: 'v',
    type: 'string',
    describe: 'Bible version',
    default: 'NIV',
  })
  .command(
    ['$0 [passages...]', 'read [passages...]'],
    'Read a passage of the Bible',
    yargs =>
      passageCommandOptions(yargs).positional('passages', {
        type: 'string',
        describe: 'One or more passage references (book, chapters, and verses)',
        default: undefined,
      }),
    yargs =>
      runCommand(async () => {
        const bible = createDailyBread({
          version: yargs.version,
          showVerseNumbers: yargs.verseNumbers,
          showChapterNumbers: yargs.chapterNumbers,
          useHomepageForVotd: yargs.useHomepageForVotd,
        });
        const userInput = Array.isArray(yargs.passages) ? yargs.passages.join(' ') : yargs.passages;
        if (!userInput) {
          throw new Error('At least one passage is required');
        }
        const passages = await bible.get(userInput);
        if (passages.length === 0) {
          throw new Error('No passages found');
        }
        for (const passage of passages) {
          console.log(passage.reference);
          console.log();
          console.log(passage.text);
          console.log();
        }
      }),
  )
  .command(
    'votd',
    'Read the verse of the day',
    yargs => passageCommandOptions(yargs),
    yargs =>
      runCommand(async () => {
        const bible = createDailyBread({
          version: yargs.version,
          showVerseNumbers: yargs.verseNumbers,
          showChapterNumbers: yargs.chapterNumbers,
          useHomepageForVotd: yargs.useHomepageForVotd,
        });
        const votd = await bible.votd();
        console.log(votd.reference);
        console.log();
        console.log(votd.text);
        console.log();
      }),
  )
  .command(
    'book name',
    'Get information on a book of the Bible',
    yargs => {
      return yargs.positional('name', {
        type: 'string',
        describe: 'Name or abbreviation',
        default: undefined,
      });
    },
    yargs =>
      runCommand(async () => {
        const bible = createDailyBread({
          version: yargs.version,
        });
        yargs._.shift();
        const userInput = [yargs.name, ...yargs._].join(' ');
        if (!userInput) {
          throw new Error('Book name is required');
        }
        const book = bible.getBook(userInput);
        if (!book) {
          throw new Error('Book not found: ' + userInput);
        }

        console.log('Name:', book.name[bible.getVersion().language]);
        console.log('Chapters:', book.chapters);
        console.log('Testament:', book.testament.substring(0, 1).toLocaleUpperCase() + book.testament.substring(1));
        console.log('Canon:', book.canon === Canon.Canon ? 'Canon' : 'Deuterocanon');
        const categories = Object.entries(Category)
          .filter(([_, value]) => typeof value === 'number')
          .filter(([_, bit]) => (book.categories & (bit as number)) !== 0)
          .map(([name]) => name)
          .join(', ');
        console.log('Categories:', categories);
      }),
  )
  .command(
    'books',
    'List all books of the Bible.',
    () => {},
    yargs =>
      runCommand(async () => {
        const bible = createDailyBread({
          version: yargs.version,
        });
        const versionData = bible.getVersion();

        console.log('== Old Testament ==');
        for (const book of CanonicalOrder[Testament.Old]) {
          const bookData = findBook(book, versionData.language, versionData.deuterocanon);
          if (!bookData) {
            throw new Error(`Failed to find book data for ${book}`);
          }
          console.log(bookData.name[versionData.language]);
        }
        console.log();

        console.log('== New Testament ==');
        for (const book of CanonicalOrder[Testament.New]) {
          const bookData = findBook(book, versionData.language, versionData.deuterocanon);
          if (!bookData) {
            throw new Error(`Failed to find book data for ${book}`);
          }
          console.log(bookData.name[versionData.language]);
        }

        if (versionData.deuterocanon) {
          console.log();
          console.log('== Apocrypha ==');
          for (const book of DeuterocanonicalOrder) {
            const bookData = findBook(book, versionData.language, versionData.deuterocanon);
            if (!bookData) {
              throw new Error(`Failed to find book data for ${book}`);
            }
            console.log(bookData.name[versionData.language]);
          }
        }
      }),
  )
  .command(
    'versions',
    'List all supported versions.',
    () => {},
    yargs =>
      runCommand(async () => {
        let first = true;
        for (const [language, versions] of Object.entries(Versions)) {
          if (first) {
            first = false;
          } else {
            console.log();
          }
          console.log(`== ${LanguageNames[language as Language]} ==`);
          for (const version of versions.values()) {
            console.log(`${version.abbreviation} (${version.name})`);
          }
        }
      }),
  )
  .parserConfiguration({
    'populate--': true,
  })
  .help()
  .alias('h', 'help')
  .demandCommand().argv;
