import {
  BookData,
  Canon,
  CanonBook,
  CanonData,
  Category,
  DeuterocanonBook,
  DeuterocanonData,
  Language,
  Testament,
} from './bible.js';
import { CaseInsensitiveMap } from './util/case-insensitive-map.js';

/**
 * Data for all books of the canon.
 */
export const CanonBooks: CanonData = {
  [CanonBook.Genesis]: {
    name: {
      [Language.English]: 'Genesis',
    },
    abbreviation: CanonBook.Genesis,
    testament: Testament.Old,
    categories: Category.Instruction | Category.Pentateuch,
    chapters: 50,
    canon: Canon.Canon,
  },
  [CanonBook.Exodus]: {
    name: {
      [Language.English]: 'Exodus',
    },
    abbreviation: CanonBook.Exodus,
    testament: Testament.Old,
    categories: Category.Instruction | Category.Pentateuch,
    chapters: 40,
    canon: Canon.Canon,
  },
  [CanonBook.Leviticus]: {
    name: {
      [Language.English]: 'Leviticus',
    },
    abbreviation: CanonBook.Leviticus,
    testament: Testament.Old,
    categories: Category.Instruction | Category.Pentateuch,
    chapters: 27,
    canon: Canon.Canon,
  },
  [CanonBook.Numbers]: {
    name: {
      [Language.English]: 'Numbers',
    },
    abbreviation: CanonBook.Numbers,
    testament: Testament.Old,
    categories: Category.Instruction | Category.Pentateuch,
    chapters: 36,
    canon: Canon.Canon,
  },
  [CanonBook.Deuteronomy]: {
    name: {
      [Language.English]: 'Deuteronomy',
    },
    abbreviation: CanonBook.Deuteronomy,
    testament: Testament.Old,
    categories: Category.Instruction | Category.Pentateuch,
    chapters: 34,
    canon: Canon.Canon,
  },
  [CanonBook.Joshua]: {
    name: {
      [Language.English]: 'Joshua',
    },
    abbreviation: CanonBook.Joshua,
    testament: Testament.Old,
    categories: Category.Prophets | Category.FormerProphets | Category.HistoricalNarrative,
    chapters: 24,
    canon: Canon.Canon,
  },
  [CanonBook.Judges]: {
    name: {
      [Language.English]: 'Judges',
    },
    abbreviation: CanonBook.Judges,
    testament: Testament.Old,
    categories: Category.Prophets | Category.FormerProphets | Category.HistoricalNarrative,
    chapters: 21,
    canon: Canon.Canon,
  },
  [CanonBook.Ruth]: {
    name: {
      [Language.English]: 'Ruth',
    },
    abbreviation: CanonBook.Ruth,
    testament: Testament.Old,
    categories: Category.Writings | Category.Scrolls | Category.HistoricalNarrative,
    chapters: 4,
    canon: Canon.Canon,
  },
  [CanonBook.FirstSamuel]: {
    name: {
      [Language.English]: '1 Samuel',
    },
    abbreviation: CanonBook.FirstSamuel,
    testament: Testament.Old,
    categories: Category.Prophets | Category.FormerProphets | Category.HistoricalNarrative,
    chapters: 31,
    canon: Canon.Canon,
  },
  [CanonBook.SecondSamuel]: {
    name: {
      [Language.English]: '2 Samuel',
    },
    abbreviation: CanonBook.SecondSamuel,
    testament: Testament.Old,
    categories: Category.Prophets | Category.FormerProphets | Category.HistoricalNarrative,
    chapters: 24,
    canon: Canon.Canon,
  },
  [CanonBook.FirstKings]: {
    name: {
      [Language.English]: '1 Kings',
    },
    abbreviation: CanonBook.FirstKings,
    testament: Testament.Old,
    categories: Category.Prophets | Category.FormerProphets | Category.HistoricalNarrative,
    chapters: 22,
    canon: Canon.Canon,
  },
  [CanonBook.SecondKings]: {
    name: {
      [Language.English]: '2 Kings',
    },
    abbreviation: CanonBook.SecondKings,
    testament: Testament.Old,
    categories: Category.Prophets | Category.FormerProphets | Category.HistoricalNarrative,
    chapters: 25,
    canon: Canon.Canon,
  },
  [CanonBook.FirstChronicles]: {
    name: {
      [Language.English]: '1 Chronicles',
    },
    abbreviation: CanonBook.FirstChronicles,
    testament: Testament.Old,
    categories: Category.Writings | Category.Historical | Category.HistoricalNarrative,
    chapters: 29,
    canon: Canon.Canon,
  },
  [CanonBook.SecondChronicles]: {
    name: {
      [Language.English]: '2 Chronicles',
    },
    abbreviation: CanonBook.SecondChronicles,
    testament: Testament.Old,
    categories: Category.Writings | Category.Historical | Category.HistoricalNarrative,
    chapters: 36,
    canon: Canon.Canon,
  },
  [CanonBook.Ezra]: {
    name: {
      [Language.English]: 'Ezra',
    },
    abbreviation: CanonBook.Ezra,
    testament: Testament.Old,
    categories: Category.Writings | Category.Historical | Category.HistoricalNarrative,
    chapters: 10,
    canon: Canon.Canon,
  },
  [CanonBook.Nehemiah]: {
    name: {
      [Language.English]: 'Nehemiah',
    },
    abbreviation: CanonBook.Nehemiah,
    testament: Testament.Old,
    categories: Category.Writings | Category.Historical | Category.HistoricalNarrative,
    chapters: 13,
    canon: Canon.Canon,
  },
  [CanonBook.Esther]: {
    name: {
      [Language.English]: 'Esther',
    },
    abbreviation: CanonBook.Esther,
    testament: Testament.Old,
    categories: Category.Writings | Category.Scrolls | Category.HistoricalNarrative,
    chapters: 10,
    canon: Canon.Canon,
  },
  [CanonBook.Job]: {
    name: {
      [Language.English]: 'Job',
    },
    abbreviation: CanonBook.Job,
    testament: Testament.Old,
    categories: Category.Writings | Category.Poetic | Category.Wisdom | Category.Sapiental,
    chapters: 42,
    canon: Canon.Canon,
  },
  [CanonBook.Psalm]: {
    name: {
      [Language.English]: 'Psalm',
    },
    abbreviation: CanonBook.Psalm,
    testament: Testament.Old,
    categories: Category.Writings | Category.Poetic | Category.Wisdom | Category.Sapiental,
    chapters: 150,
    canon: Canon.Canon,
  },
  [CanonBook.Proverbs]: {
    name: {
      [Language.English]: 'Proverbs',
    },
    abbreviation: CanonBook.Proverbs,
    testament: Testament.Old,
    categories: Category.Writings | Category.Poetic | Category.Wisdom | Category.Sapiental,
    chapters: 31,
    canon: Canon.Canon,
  },
  [CanonBook.Ecclesiastes]: {
    name: {
      [Language.English]: 'Ecclesiastes',
    },
    abbreviation: CanonBook.Ecclesiastes,
    testament: Testament.Old,
    categories: Category.Writings | Category.Scrolls | Category.Wisdom | Category.Sapiental,
    chapters: 12,
    canon: Canon.Canon,
  },
  [CanonBook.SongOfSongs]: {
    name: {
      [Language.English]: 'Song of Songs',
    },
    abbreviation: CanonBook.SongOfSongs,
    testament: Testament.Old,
    categories: Category.Writings | Category.Scrolls | Category.Wisdom | Category.Sapiental,
    chapters: 8,
    canon: Canon.Canon,
  },
  [CanonBook.Isaiah]: {
    name: {
      [Language.English]: 'Isaiah',
    },
    abbreviation: CanonBook.Isaiah,
    testament: Testament.Old,
    categories: Category.Prophets | Category.LatterProphets | Category.Prophetic | Category.MajorProphets,
    chapters: 66,
    canon: Canon.Canon,
  },
  [CanonBook.Jeremiah]: {
    name: {
      [Language.English]: 'Jeremiah',
    },
    abbreviation: CanonBook.Jeremiah,
    testament: Testament.Old,
    categories: Category.Prophets | Category.LatterProphets | Category.Prophetic | Category.MajorProphets,
    chapters: 52,
    canon: Canon.Canon,
  },
  [CanonBook.Lamentations]: {
    name: {
      [Language.English]: 'Lamentations',
    },
    abbreviation: CanonBook.Lamentations,
    testament: Testament.Old,
    categories: Category.Writings | Category.Scrolls | Category.Prophetic | Category.MajorProphets,
    chapters: 5,
    canon: Canon.Canon,
  },
  [CanonBook.Ezekiel]: {
    name: {
      [Language.English]: 'Ezekiel',
    },
    abbreviation: CanonBook.Ezekiel,
    testament: Testament.Old,
    categories: Category.Prophets | Category.LatterProphets | Category.Prophetic | Category.MajorProphets,
    chapters: 48,
    canon: Canon.Canon,
  },
  [CanonBook.Daniel]: {
    name: {
      [Language.English]: 'Daniel',
    },
    abbreviation: CanonBook.Daniel,
    testament: Testament.Old,
    categories: Category.Writings | Category.Historical | Category.Prophetic | Category.MajorProphets,
    chapters: 12,
    canon: Canon.Canon,
  },
  [CanonBook.Hosea]: {
    name: {
      [Language.English]: 'Hosea',
    },
    abbreviation: CanonBook.Hosea,
    testament: Testament.Old,
    categories: Category.Prophets | Category.MinorProphets | Category.Prophetic,
    chapters: 14,
    canon: Canon.Canon,
  },
  [CanonBook.Joel]: {
    name: {
      [Language.English]: 'Joel',
    },
    abbreviation: CanonBook.Joel,
    testament: Testament.Old,
    categories: Category.Prophets | Category.MinorProphets | Category.Prophetic,
    chapters: 3,
    canon: Canon.Canon,
  },
  [CanonBook.Amos]: {
    name: {
      [Language.English]: 'Amos',
    },
    abbreviation: CanonBook.Amos,
    testament: Testament.Old,
    categories: Category.Prophets | Category.MinorProphets | Category.Prophetic,
    chapters: 9,
    canon: Canon.Canon,
  },
  [CanonBook.Obadiah]: {
    name: {
      [Language.English]: 'Obadiah',
    },
    abbreviation: CanonBook.Obadiah,
    testament: Testament.Old,
    categories: Category.Prophets | Category.MinorProphets | Category.Prophetic,
    chapters: 1,
    canon: Canon.Canon,
  },
  [CanonBook.Jonah]: {
    name: {
      [Language.English]: 'Jonah',
    },
    abbreviation: CanonBook.Jonah,
    testament: Testament.Old,
    categories: Category.Prophets | Category.MinorProphets | Category.Prophetic,
    chapters: 4,
    canon: Canon.Canon,
  },
  [CanonBook.Micah]: {
    name: {
      [Language.English]: 'Micah',
    },
    abbreviation: CanonBook.Micah,
    testament: Testament.Old,
    categories: Category.Prophets | Category.MinorProphets | Category.Prophetic,
    chapters: 7,
    canon: Canon.Canon,
  },
  [CanonBook.Nahum]: {
    name: {
      [Language.English]: 'Nahum',
    },
    abbreviation: CanonBook.Nahum,
    testament: Testament.Old,
    categories: Category.Prophets | Category.MinorProphets | Category.Prophetic,
    chapters: 3,
    canon: Canon.Canon,
  },
  [CanonBook.Habakkuk]: {
    name: {
      [Language.English]: 'Habakkuk',
    },
    abbreviation: CanonBook.Habakkuk,
    testament: Testament.Old,
    categories: Category.Prophets | Category.MinorProphets | Category.Prophetic,
    chapters: 3,
    canon: Canon.Canon,
  },
  [CanonBook.Zephaniah]: {
    name: {
      [Language.English]: 'Zephaniah',
    },
    abbreviation: CanonBook.Zephaniah,
    testament: Testament.Old,
    categories: Category.Prophets | Category.MinorProphets | Category.Prophetic,
    chapters: 3,
    canon: Canon.Canon,
  },
  [CanonBook.Haggai]: {
    name: {
      [Language.English]: 'Haggai',
    },
    abbreviation: CanonBook.Haggai,
    testament: Testament.Old,
    categories: Category.Prophets | Category.MinorProphets | Category.Prophetic,
    chapters: 2,
    canon: Canon.Canon,
  },
  [CanonBook.Zechariah]: {
    name: {
      [Language.English]: 'Zechariah',
    },
    abbreviation: CanonBook.Zechariah,
    testament: Testament.Old,
    categories: Category.Prophets | Category.MinorProphets | Category.Prophetic,
    chapters: 14,
    canon: Canon.Canon,
  },
  [CanonBook.Malachi]: {
    name: {
      [Language.English]: 'Malachi',
    },
    abbreviation: CanonBook.Malachi,
    testament: Testament.Old,
    categories: Category.Prophets | Category.MinorProphets | Category.Prophetic,
    chapters: 4,
    canon: Canon.Canon,
  },
  [CanonBook.Matthew]: {
    name: {
      [Language.English]: 'Matthew',
    },
    abbreviation: CanonBook.Matthew,
    testament: Testament.New,
    categories: Category.Gospel,
    chapters: 28,
    canon: Canon.Canon,
  },
  [CanonBook.Mark]: {
    name: {
      [Language.English]: 'Mark',
    },
    abbreviation: CanonBook.Mark,
    testament: Testament.New,
    categories: Category.Gospel,
    chapters: 16,
    canon: Canon.Canon,
  },
  [CanonBook.Luke]: {
    name: {
      [Language.English]: 'Luke',
    },
    abbreviation: CanonBook.Luke,
    testament: Testament.New,
    categories: Category.Gospel,
    chapters: 24,
    canon: Canon.Canon,
  },
  [CanonBook.John]: {
    name: {
      [Language.English]: 'John',
    },
    abbreviation: CanonBook.John,
    testament: Testament.New,
    categories: Category.Gospel,
    chapters: 21,
    canon: Canon.Canon,
  },
  [CanonBook.Acts]: {
    name: {
      [Language.English]: 'Acts',
    },
    abbreviation: CanonBook.Acts,
    testament: Testament.New,
    categories: Category.Acts,
    chapters: 28,
    canon: Canon.Canon,
  },
  [CanonBook.Romans]: {
    name: {
      [Language.English]: 'Romans',
    },
    abbreviation: CanonBook.Romans,
    testament: Testament.New,
    categories: Category.Epistle,
    chapters: 16,
    canon: Canon.Canon,
  },
  [CanonBook.FirstCorinthians]: {
    name: {
      [Language.English]: '1 Corinthians',
    },
    abbreviation: CanonBook.FirstCorinthians,
    testament: Testament.New,
    categories: Category.Epistle,
    chapters: 16,
    canon: Canon.Canon,
  },
  [CanonBook.SecondCorinthians]: {
    name: {
      [Language.English]: '2 Corinthians',
    },
    abbreviation: CanonBook.SecondCorinthians,
    testament: Testament.New,
    categories: Category.Epistle,
    chapters: 13,
    canon: Canon.Canon,
  },
  [CanonBook.Galatians]: {
    name: {
      [Language.English]: 'Galatians',
    },
    abbreviation: CanonBook.Galatians,
    testament: Testament.New,
    categories: Category.Epistle,
    chapters: 6,
    canon: Canon.Canon,
  },
  [CanonBook.Ephesians]: {
    name: {
      [Language.English]: 'Ephesians',
    },
    abbreviation: CanonBook.Ephesians,
    testament: Testament.New,
    categories: Category.Epistle,
    chapters: 6,
    canon: Canon.Canon,
  },
  [CanonBook.Philippians]: {
    name: {
      [Language.English]: 'Philippians',
    },
    abbreviation: CanonBook.Philippians,
    testament: Testament.New,
    categories: Category.Epistle,
    chapters: 4,
    canon: Canon.Canon,
  },
  [CanonBook.Colossians]: {
    name: {
      [Language.English]: 'Colossians',
    },
    abbreviation: CanonBook.Colossians,
    testament: Testament.New,
    categories: Category.Epistle,
    chapters: 4,
    canon: Canon.Canon,
  },
  [CanonBook.FirstThessalonians]: {
    name: {
      [Language.English]: '1 Thessalonians',
    },
    abbreviation: CanonBook.FirstThessalonians,
    testament: Testament.New,
    categories: Category.Epistle,
    chapters: 5,
    canon: Canon.Canon,
  },
  [CanonBook.SecondThessalonians]: {
    name: {
      [Language.English]: '2 Thessalonians',
    },
    abbreviation: CanonBook.SecondThessalonians,
    testament: Testament.New,
    categories: Category.Epistle,
    chapters: 3,
    canon: Canon.Canon,
  },
  [CanonBook.FirstTimothy]: {
    name: {
      [Language.English]: '1 Timothy',
    },
    abbreviation: CanonBook.FirstTimothy,
    testament: Testament.New,
    categories: Category.Epistle,
    chapters: 6,
    canon: Canon.Canon,
  },
  [CanonBook.SecondTimothy]: {
    name: {
      [Language.English]: '2 Timothy',
    },
    abbreviation: CanonBook.SecondTimothy,
    testament: Testament.New,
    categories: Category.Epistle,
    chapters: 4,
    canon: Canon.Canon,
  },
  [CanonBook.Titus]: {
    name: {
      [Language.English]: 'Titus',
    },
    abbreviation: CanonBook.Titus,
    testament: Testament.New,
    categories: Category.Epistle,
    chapters: 3,
    canon: Canon.Canon,
  },
  [CanonBook.Philemon]: {
    name: {
      [Language.English]: 'Philemon',
    },
    abbreviation: CanonBook.Philemon,
    testament: Testament.New,
    categories: Category.Epistle,
    chapters: 1,
    canon: Canon.Canon,
  },
  [CanonBook.Hebrews]: {
    name: {
      [Language.English]: 'Hebrews',
    },
    abbreviation: CanonBook.Hebrews,
    testament: Testament.New,
    categories: Category.Epistle,
    chapters: 13,
    canon: Canon.Canon,
  },
  [CanonBook.James]: {
    name: {
      [Language.English]: 'James',
    },
    abbreviation: CanonBook.James,
    testament: Testament.New,
    categories: Category.Epistle,
    chapters: 5,
    canon: Canon.Canon,
  },
  [CanonBook.FirstPeter]: {
    name: {
      [Language.English]: '1 Peter',
    },
    abbreviation: CanonBook.FirstPeter,
    testament: Testament.New,
    categories: Category.Epistle,
    chapters: 5,
    canon: Canon.Canon,
  },
  [CanonBook.SecondPeter]: {
    name: {
      [Language.English]: '2 Peter',
    },
    abbreviation: CanonBook.SecondPeter,
    testament: Testament.New,
    categories: Category.Epistle,
    chapters: 3,
    canon: Canon.Canon,
  },
  [CanonBook.FirstJohn]: {
    name: {
      [Language.English]: '1 John',
    },
    abbreviation: CanonBook.FirstJohn,
    testament: Testament.New,
    categories: Category.Epistle,
    chapters: 5,
    canon: Canon.Canon,
  },
  [CanonBook.SecondJohn]: {
    name: {
      [Language.English]: '2 John',
    },
    abbreviation: CanonBook.SecondJohn,
    testament: Testament.New,
    categories: Category.Epistle,
    chapters: 1,
    canon: Canon.Canon,
  },
  [CanonBook.ThirdJohn]: {
    name: {
      [Language.English]: '3 John',
    },
    abbreviation: CanonBook.ThirdJohn,
    testament: Testament.New,
    categories: Category.Epistle,
    chapters: 1,
    canon: Canon.Canon,
  },
  [CanonBook.Jude]: {
    name: {
      [Language.English]: 'Jude',
    },
    abbreviation: CanonBook.Jude,
    testament: Testament.New,
    categories: Category.Epistle,
    chapters: 1,
    canon: Canon.Canon,
  },
  [CanonBook.Revelation]: {
    name: {
      [Language.English]: 'Revelation',
    },
    abbreviation: CanonBook.Revelation,
    testament: Testament.New,
    categories: Category.Apocalyptic,
    chapters: 22,
    canon: Canon.Canon,
  },
};

/**
 * Data for all books of the deuterocanon.
 */
export const DeuterocanonBooks: DeuterocanonData = {
  [DeuterocanonBook.Tobit]: {
    name: {
      [Language.English]: 'Tobit',
    },
    abbreviation: DeuterocanonBook.Tobit,
    testament: Testament.Old,
    categories: Category.Novel,
    chapters: 14,
    canon: Canon.Deuterocanon,
  },
  [DeuterocanonBook.Judith]: {
    name: {
      [Language.English]: 'Judith',
    },
    abbreviation: DeuterocanonBook.Judith,
    testament: Testament.Old,
    categories: Category.Novel,
    chapters: 16,
    canon: Canon.Deuterocanon,
  },
  [DeuterocanonBook.GreekEsther]: {
    name: {
      [Language.English]: 'Greek Esther',
    },
    abbreviation: DeuterocanonBook.GreekEsther,
    testament: Testament.Old,
    categories: Category.Novel,
    chapters: 10,
    canon: Canon.Deuterocanon,
  },
  [DeuterocanonBook.Wisdom]: {
    name: {
      [Language.English]: 'Wisdom',
    },
    abbreviation: DeuterocanonBook.Wisdom,
    testament: Testament.Old,
    categories: Category.Sapiental,
    chapters: 19,
    canon: Canon.Deuterocanon,
  },
  [DeuterocanonBook.Sirach]: {
    name: {
      [Language.English]: 'Sirach',
    },
    abbreviation: DeuterocanonBook.Sirach,
    testament: Testament.Old,
    categories: Category.Sapiental,
    chapters: 51,
    canon: Canon.Deuterocanon,
  },
  [DeuterocanonBook.Baruch]: {
    name: {
      [Language.English]: 'Baruch',
    },
    abbreviation: DeuterocanonBook.Baruch,
    testament: Testament.Old,
    categories: Category.Prophetic | Category.MajorProphets,
    chapters: 5,
    canon: Canon.Deuterocanon,
  },
  [DeuterocanonBook.LetterOfJeremiah]: {
    name: {
      [Language.English]: 'Letter of Jeremiah',
    },
    abbreviation: DeuterocanonBook.LetterOfJeremiah,
    testament: Testament.Old,
    categories: Category.Prophetic | Category.MajorProphets,
    chapters: 1,
    canon: Canon.Deuterocanon,
  },
  [DeuterocanonBook.PrayerOfAzariah]: {
    name: {
      [Language.English]: 'Prayer of Azariah',
    },
    abbreviation: DeuterocanonBook.PrayerOfAzariah,
    testament: Testament.Old,
    categories: CanonBooks[CanonBook.Daniel].categories,
    chapters: 1,
    canon: Canon.Deuterocanon,
  },
  [DeuterocanonBook.Susanna]: {
    name: {
      [Language.English]: 'Susanna',
    },
    abbreviation: DeuterocanonBook.Susanna,
    testament: Testament.Old,
    categories: CanonBooks[CanonBook.Daniel].categories,
    chapters: 1,
    canon: Canon.Deuterocanon,
  },
  [DeuterocanonBook.BelAndTheDragon]: {
    name: {
      [Language.English]: 'Bel and the Dragon',
    },
    abbreviation: DeuterocanonBook.BelAndTheDragon,
    testament: Testament.Old,
    categories: CanonBooks[CanonBook.Daniel].categories,
    chapters: 1,
    canon: Canon.Deuterocanon,
  },
  [DeuterocanonBook.FirstMaccabees]: {
    name: {
      [Language.English]: '1 Maccabees',
    },
    abbreviation: DeuterocanonBook.FirstMaccabees,
    testament: Testament.Old,
    categories: Category.HistoricalNarrative,
    chapters: 16,
    canon: Canon.Deuterocanon,
  },
  [DeuterocanonBook.SecondMaccabees]: {
    name: {
      [Language.English]: '2 Maccabees',
    },
    abbreviation: DeuterocanonBook.SecondMaccabees,
    testament: Testament.Old,
    categories: Category.HistoricalNarrative,
    chapters: 15,
    canon: Canon.Deuterocanon,
  },
  [DeuterocanonBook.FirstEsdras]: {
    name: {
      [Language.English]: '1 Esdras',
    },
    abbreviation: DeuterocanonBook.FirstEsdras,
    testament: Testament.Old,
    categories: Category.HistoricalNarrative,
    chapters: 9,
    canon: Canon.Deuterocanon,
  },
  [DeuterocanonBook.PrayerOfManasseh]: {
    name: {
      [Language.English]: 'Prayer of Manasseh',
    },
    abbreviation: DeuterocanonBook.PrayerOfManasseh,
    testament: Testament.Old,
    categories: Category.Prophetic,
    chapters: 1,
    canon: Canon.Deuterocanon,
  },
  [DeuterocanonBook.PsalmOneFiftyOne]: {
    name: {
      [Language.English]: 'Psalm 151',
    },
    abbreviation: DeuterocanonBook.PsalmOneFiftyOne,
    testament: Testament.Old,
    categories: CanonBooks[CanonBook.Psalm].categories,
    chapters: 1,
    canon: Canon.Deuterocanon,
  },
  [DeuterocanonBook.ThirdMaccabees]: {
    name: {
      [Language.English]: '3 Maccabees',
    },
    abbreviation: DeuterocanonBook.ThirdMaccabees,
    testament: Testament.Old,
    categories: Category.Novel,
    chapters: 7,
    canon: Canon.Deuterocanon,
  },
  [DeuterocanonBook.SecondEsdras]: {
    name: {
      [Language.English]: '2 Esdras',
    },
    abbreviation: DeuterocanonBook.SecondEsdras,
    testament: Testament.Old,
    categories: Category.Apocalyptic,
    chapters: 16,
    canon: Canon.Deuterocanon,
  },
  [DeuterocanonBook.FourthMaccabees]: {
    name: {
      [Language.English]: '4 Maccabees',
    },
    abbreviation: DeuterocanonBook.FourthMaccabees,
    testament: Testament.Old,
    categories: Category.Philosophical,
    chapters: 18,
    canon: Canon.Deuterocanon,
  },
};

/**
 * Canonical ordering of books of the Bible, according to Christian canon.
 */
export const CanonicalOrder: { [testament in Testament]: CanonBook[] } = {
  [Testament.Old]: [
    CanonBook.Genesis,
    CanonBook.Exodus,
    CanonBook.Leviticus,
    CanonBook.Numbers,
    CanonBook.Deuteronomy,
    CanonBook.Joshua,
    CanonBook.Judges,
    CanonBook.Ruth,
    CanonBook.FirstSamuel,
    CanonBook.SecondSamuel,
    CanonBook.FirstKings,
    CanonBook.SecondKings,
    CanonBook.FirstChronicles,
    CanonBook.SecondChronicles,
    CanonBook.Ezra,
    CanonBook.Nehemiah,
    CanonBook.Esther,
    CanonBook.Job,
    CanonBook.Psalm,
    CanonBook.Proverbs,
    CanonBook.Ecclesiastes,
    CanonBook.SongOfSongs,
    CanonBook.Isaiah,
    CanonBook.Jeremiah,
    CanonBook.Lamentations,
    CanonBook.Ezekiel,
    CanonBook.Daniel,
    CanonBook.Hosea,
    CanonBook.Joel,
    CanonBook.Amos,
    CanonBook.Obadiah,
    CanonBook.Jonah,
    CanonBook.Micah,
    CanonBook.Nahum,
    CanonBook.Habakkuk,
    CanonBook.Zephaniah,
    CanonBook.Haggai,
    CanonBook.Zechariah,
    CanonBook.Malachi,
  ],
  [Testament.New]: [
    CanonBook.Matthew,
    CanonBook.Mark,
    CanonBook.Luke,
    CanonBook.John,
    CanonBook.Acts,
    CanonBook.Romans,
    CanonBook.FirstCorinthians,
    CanonBook.SecondCorinthians,
    CanonBook.Galatians,
    CanonBook.Ephesians,
    CanonBook.Philippians,
    CanonBook.Colossians,
    CanonBook.FirstThessalonians,
    CanonBook.SecondThessalonians,
    CanonBook.FirstTimothy,
    CanonBook.SecondTimothy,
    CanonBook.Titus,
    CanonBook.Philemon,
    CanonBook.Hebrews,
    CanonBook.James,
    CanonBook.FirstPeter,
    CanonBook.SecondPeter,
    CanonBook.FirstJohn,
    CanonBook.SecondJohn,
    CanonBook.ThirdJohn,
    CanonBook.Jude,
    CanonBook.Revelation,
  ],
};

/**
 * Canonical ordering of detuerocanon books of the Bible, according to Christian canon.
 */
export const DeuterocanonicalOrder: DeuterocanonBook[] = [
  DeuterocanonBook.Tobit,
  DeuterocanonBook.Judith,
  DeuterocanonBook.GreekEsther,
  DeuterocanonBook.Wisdom,
  DeuterocanonBook.Sirach,
  DeuterocanonBook.Baruch,
  DeuterocanonBook.LetterOfJeremiah,
  DeuterocanonBook.PrayerOfAzariah,
  DeuterocanonBook.Susanna,
  DeuterocanonBook.BelAndTheDragon,
  DeuterocanonBook.FirstMaccabees,
  DeuterocanonBook.SecondMaccabees,
  DeuterocanonBook.FirstEsdras,
  DeuterocanonBook.PrayerOfManasseh,
  DeuterocanonBook.PsalmOneFiftyOne,
  DeuterocanonBook.ThirdMaccabees,
  DeuterocanonBook.SecondEsdras,
  DeuterocanonBook.FourthMaccabees,
];

/**
 * Dictionary used for quick lookup of a book of the canon by name for all languages.
 */
export type CanonNameLookupMap = { [language in Language]: CaseInsensitiveMap<CanonBook> };

/**
 * Dictionary used for quick lookup of a book of the deuterocanon by name for all languages.
 */
export type DeuterocanonNameLookupMap = { [language in Language]: CaseInsensitiveMap<DeuterocanonBook> };

/**
 * Generates a mapping of names in a given language to CanonBook key.
 * @param language Language to generate entries for.
 * @returns Array of name => key pairs.
 */
function generateDefaultNameLookupForCanon(language: Language): [string, CanonBook][] {
  return Object.entries(CanonBooks)
    .map(
      ([key, data]) =>
        [
          [key, key],
          [data.name[language], key],
        ] as [string, CanonBook][],
    )
    .flat();
}

/**
 *  Generates a mapping of names in a given language to DeuterocanonBook key.
 * @param language Language to generate entries for.
 * @returns Array of name => key pairs.
 */
function generateDefaultNameLookupForDeuterocanon(language: Language): [string, DeuterocanonBook][] {
  return Object.entries(DeuterocanonBooks)
    .map(
      ([key, data]) =>
        [
          [key, key],
          [data.name[language], key],
        ] as [string, DeuterocanonBook][],
    )
    .flat();
}

/**
 * Map for quick lookup of a book of the canon by name and language.
 */
export const CanonNameLookup: CanonNameLookupMap = {
  [Language.English]: new CaseInsensitiveMap([
    ...generateDefaultNameLookupForCanon(Language.English),
    ['EX', CanonBook.Exodus],
    ['1 SAM', CanonBook.FirstSamuel],
    ['2 SAM', CanonBook.SecondSamuel],
    ['1 KGS', CanonBook.FirstKings],
    ['2 KGS', CanonBook.SecondKings],
    ['1 CHR', CanonBook.FirstChronicles],
    ['2 CHR', CanonBook.SecondChronicles],
    ['ESTH', CanonBook.Esther],
    ['PSA', CanonBook.Psalm],
    ['ECCL', CanonBook.Ecclesiastes],
    ['EZEK', CanonBook.Ezekiel],
    ['1 COR', CanonBook.FirstCorinthians],
    ['2 COR', CanonBook.SecondCorinthians],
    ['1 THESS', CanonBook.FirstThessalonians],
    ['2 THESS', CanonBook.SecondThessalonians],
    ['1 TIM', CanonBook.FirstTimothy],
    ['2 TIM', CanonBook.SecondTimothy],
    ['1 PET', CanonBook.FirstPeter],
    ['2 PET', CanonBook.SecondPeter],
    ['1 JOHN', CanonBook.FirstJohn],
    ['2 JOHN', CanonBook.SecondJohn],
    ['3 JOHN', CanonBook.ThirdJohn],
    ['Song of Solomon', CanonBook.SongOfSongs],
    ['Psalms', CanonBook.Psalm],
    ['Acts of the Apostles', CanonBook.Acts],
    ['Phillippians', CanonBook.Philippians],
  ]),
};

/**
 * Map for quick lookup of a book of the deuterocanon by name and language.
 */
export const DeuterocanonNameLookup: DeuterocanonNameLookupMap = {
  [Language.English]: new CaseInsensitiveMap([
    ...generateDefaultNameLookupForDeuterocanon(Language.English),
    ['GK ESTH', DeuterocanonBook.GreekEsther],
    ['EP JER', DeuterocanonBook.LetterOfJeremiah],
    ['PR AZAR', DeuterocanonBook.PrayerOfAzariah],
    ['1 MACC', DeuterocanonBook.FirstMaccabees],
    ['2 MACC', DeuterocanonBook.SecondMaccabees],
    ['1 ESD', DeuterocanonBook.FirstEsdras],
    ['PR MAN', DeuterocanonBook.PrayerOfManasseh],
    ['PS 151', DeuterocanonBook.PsalmOneFiftyOne],
    ['PSA151', DeuterocanonBook.PsalmOneFiftyOne],
    ['PSA 151', DeuterocanonBook.PsalmOneFiftyOne],
    ['PSALM151', DeuterocanonBook.PsalmOneFiftyOne],
    ['3 MACC', DeuterocanonBook.ThirdMaccabees],
    ['2 ESD', DeuterocanonBook.SecondEsdras],
    ['4 MACC', DeuterocanonBook.FourthMaccabees],
  ]),
};

/**
 * Finds data about a book of the Bible based on its name or abbreviation.
 * @param name Name of the book.
 * @param language Language.
 * @param includeDeuterocanon Whether to search for detuerocanon books.
 * @returns `BookData` for the bookif it exists. `null` if not found.
 */
export function findBook(name: string, language: Language, includeDeuterocanon: boolean = false): BookData | null {
  const book = CanonNameLookup[language]?.get(name);
  if (!book) {
    if (includeDeuterocanon) {
      const deuteroBook = DeuterocanonNameLookup[language]?.get(name);
      if (deuteroBook) {
        return DeuterocanonBooks[deuteroBook];
      }
    }
    return null;
  }
  return CanonBooks[book];
}
