/**
 * The testament (old or new) that the book belongs to.
 */
export enum Testament {
  Old = 'old',
  New = 'new',
}

/**
 * The canon that the book belongs to.
 */
export enum Canon {
  Canon = 1,
  Deuterocanon = 2,
}

/**
 * Currently supported languages.
 */
export enum Language {
  English = 'english',
}

/**
 * Categories of books of the Bible.
 */
export enum Category {
  /**
   * The first five books of law.
   */
  Instruction = 1 << 0,
  /**
   * Books about the spokespeople of God.
   */
  Prophets = 1 << 1,
  /**
   * Books categorized as former prophets.
   */
  FormerProphets = 1 << 2,
  /**
   * Books categorized as latter prophets.
   */
  LatterProphets = 1 << 3,
  /**
   * Books accredited to one of the minor prophets.
   */
  MinorProphets = 1 << 4,
  /**
   * Miscallenous books that make up the Hebrew Bible outside of the law and prophets.
   */
  Writings = 1 << 5,
  /**
   * Books comprised primarily of poetry.
   */
  Poetic = 1 << 6,
  /**
   * Books grouped together as the Five Scrolls in biblical tradition.
   */
  Scrolls = 1 << 7,
  /**
   * Books in the Writings that are read as historical narrative.
   *
   * This category refers to the section of the Writings in the Hebrew Bible.
   */
  Historical = 1 << 8,
  /**
   * The first five books of the Hebrew Bible.
   */
  Pentateuch = 1 << 9,
  /**
   * Books read as historical narrative about God's people.
   *
   * This category refers to all books of the Old Testament that are read as historical narrative outside of the
   * Pentateuch.
   */
  HistoricalNarrative = 1 << 10,
  /**
   * Books that are read as wisdom literature.
   */
  Wisdom = 1 << 11,
  /**
   * Books that are prophetic in nature.
   */
  Prophetic = 1 << 12,
  /**
   * Books accredited to the major prophets.
   */
  MajorProphets = 1 << 13,
  /**
   * Books about the ministry of Jesus Christ.
   */
  Gospel = 1 << 14,
  /**
   * Books documenting acts of the apostles.
   */
  Acts = 1 << 15,
  /**
   * Letters written to the early church.
   */
  Epistle = 1 << 16,
  /**
   * Books that are primarily apocalpytic.
   */
  Apocalyptic = 1 << 17,
  /**
   * Books included in the Sapiental Books.
   */
  Sapiental = 1 << 18,
  /**
   * Books that are read as religious novels with some historical elements.
   *
   * Reserved for the deuterocanon.
   */
  Novel = 1 << 19,
  /**
   * Books read as philosophical discourse.
   */
  Philosophical = 1 << 20,

  // Next bit: 21.
}

/**
 * Simple enumeration of all canonical books.
 */
export enum CanonBook {
  Genesis = 'GEN',
  Exodus = 'EXOD',
  Leviticus = 'LEV',
  Numbers = 'NUM',
  Deuteronomy = 'DEUT',
  Joshua = 'JOSH',
  Judges = 'JUDG',
  Ruth = 'RUTH',
  FirstSamuel = '1SAM',
  SecondSamuel = '2SAM',
  FirstKings = '1KGS',
  SecondKings = '2KGS',
  FirstChronicles = '1CHR',
  SecondChronicles = '2CHR',
  Ezra = 'EZR',
  Nehemiah = 'NEH',
  Esther = 'EST',
  Job = 'JOB',
  Psalm = 'PS',
  Proverbs = 'PROV',
  Ecclesiastes = 'ECC',
  SongOfSongs = 'SONG',
  Isaiah = 'ISA',
  Jeremiah = 'JER',
  Lamentations = 'LAM',
  Ezekiel = 'EZE',
  Daniel = 'DAN',
  Hosea = 'HOS',
  Joel = 'JOEL',
  Amos = 'AMOS',
  Obadiah = 'OBA',
  Jonah = 'JONAH',
  Micah = 'MIC',
  Nahum = 'NAH',
  Habakkuk = 'HAB',
  Zephaniah = 'ZEP',
  Haggai = 'HAG',
  Zechariah = 'ZEC',
  Malachi = 'MAL',
  Matthew = 'MATT',
  Mark = 'MARK',
  Luke = 'LUKE',
  John = 'JOHN',
  Acts = 'ACTS',
  Romans = 'ROM',
  FirstCorinthians = '1COR',
  SecondCorinthians = '2COR',
  Galatians = 'GAL',
  Ephesians = 'EPH',
  Philippians = 'PHIL',
  Colossians = 'COL',
  FirstThessalonians = '1THESS',
  SecondThessalonians = '2THESS',
  FirstTimothy = '1TIM',
  SecondTimothy = '2TIM',
  Titus = 'TITUS',
  Philemon = 'PHIL',
  Hebrews = 'HEB',
  James = 'JAM',
  FirstPeter = '1PET',
  SecondPeter = '2PET',
  FirstJohn = '1JOHN',
  SecondJohn = '2JOHN',
  ThirdJohn = '3JOHN',
  Jude = 'JUDE',
  Revelation = 'REV',
}

/**
 * Enumeration of all deuterocanonical books.
 */
export enum DeuterocanonBook {
  Tobit = 'TOB',
  Judith = 'JDT',
  GreekEsther = 'GKESTH',
  Wisdom = 'WIS',
  Sirach = 'SIR',
  Baruch = 'BAR',
  LetterOfJeremiah = 'EPJER',
  PrayerOfAzariah = 'PRAZAR',
  Susanna = 'SUS',
  BelAndTheDragon = 'BEL',
  FirstMaccabees = '1MACC',
  SecondMaccabees = '2MACC',
  FirstEsdras = '1ESD',
  PrayerOfManasseh = 'PRMAN',
  PsalmOneFiftyOne = 'PS151',
  ThirdMaccabees = '3MACC',
  SecondEsdras = '2ESD',
  FourthMaccabees = '4MACC',
}

/**
 * Data for an individual book.
 */
export interface BookData {
  name: { [language in Language]: string };
  abbreviation: string;
  testament: Testament;
  categories: number;
  chapters: number;
  canon: Canon;
}

/**
 * Data for an individual book of the canon.
 */
export interface CanonBookData extends BookData {
  abbreviation: CanonBook;
}

/**
 * Data for an individual book of the deuterocanon.
 */
export interface DeuterocanonBookData extends BookData {
  abbreviation: DeuterocanonBook;
}

/**
 * Data for the entire canon.
 */
export type CanonData = { [book in CanonBook]: CanonBookData };

/**
 * Data for the entire deuterocanon.
 */
export type DeuterocanonData = { [book in DeuterocanonBook]: DeuterocanonBookData };

/**
 * Data for an individual book of the Bible.
 */
export type Book = CanonBook | DeuterocanonBook;

/**
 * Data for the entire Bible.
 */
export type BibleData = CanonData & DeuterocanonBook;
