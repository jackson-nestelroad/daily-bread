#!/usr/bin/env node
import { exit } from 'process';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { Canon, Category, DailyBread } from '../src';

enum DailyBreadOptions {
  Version = 'version',
  ShowVerseNumbers = 'verse-numbers',
}

function runCommand(fn: () => Promise<void>) {
  fn().catch(err => {
    console.error(err.message ?? err);
    exit(1);
  });
}

function createDailyBread(options: { [option: string]: unknown }): DailyBread {
  const bible = new DailyBread();
  const version = options[DailyBreadOptions.Version].toString();
  if (version) {
    if (!bible.isSupportedVersion(version)) {
      throw new Error('Unsupported version ' + version);
    }
    bible.setVersion(version);
  }
  const verseNumbers = !!options[DailyBreadOptions.ShowVerseNumbers];
  bible.setFormatting({
    showVerseNumbers: verseNumbers,
  });
  return bible;
}

yargs(hideBin(process.argv))
  .command(
    ['$0 [passages...]', 'read [passages...]'],
    'Read a passage of the Bible',
    yargs => {
      return yargs
        .positional('passages', {
          type: 'string',
          describe: 'One or more passage references (book, chapters, and verses)',
          default: undefined,
        })
        .options(DailyBreadOptions.ShowVerseNumbers, {
          alias: 'n',
          type: 'boolean',
          describe: 'Show verse numbers?',
          default: true,
        });
    },
    yargs =>
      runCommand(async () => {
        const bible = createDailyBread(yargs);
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
        const bible = createDailyBread(yargs);
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
  .version(false)
  .options(DailyBreadOptions.Version, {
    alias: 'v',
    type: 'string',
    describe: 'Bible version',
    default: 'NIV',
  })
  .parserConfiguration({
    'populate--': true,
  })
  .help()
  .alias('h', 'help')
  .demandCommand().argv;
