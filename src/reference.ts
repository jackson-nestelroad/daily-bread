import { BookData, Language } from './bible.js';

/**
 * A reference to a section of a chapter of the Bible.
 */
export interface Reference {
  chapter?: number;
  verse?: number;
}

/**
 * A reference to a passage of a book of the Bible.
 */
export interface PassageReference {
  book: string;
  from?: Reference;
  to?: Reference;
}

const PassageReferenceRegex =
  /((?:ps(?:a(?:lm)?)?\s*151)|(?:(?:\d+\s*)?[^\s\d:,;.-][^\d:,;.-]*))\s*(?:(\d+)(?::(\d+))?(?:\s*-\s*(\d+)(?::(\d+))?)?)?/gi;

/**
 * Parses all passage references found in the given string.
 * @param str String of passage references.
 * @returns Array of passage reference objects.
 */
export function parsePassageReferences(str: string): PassageReference[] {
  return [...str.matchAll(PassageReferenceRegex)].map(m => {
    let [, book, fromChapterStr, fromVerseStr, toChapterStr, toVerseStr] = m;
    const reference: PassageReference = { book: book.trim(), from: {}, to: {} };
    if (fromChapterStr) {
      const fromChapter = parseInt(fromChapterStr);
      if (!isNaN(fromChapter)) {
        reference.from.chapter = fromChapter;
      }
    }
    if (fromVerseStr) {
      const fromVerse = parseInt(fromVerseStr);
      if (!isNaN(fromVerse)) {
        reference.from.verse = fromVerse;
      }
    }
    if (toChapterStr) {
      if (fromVerseStr && !toVerseStr) {
        // The third number is actually the ending verse.
        toVerseStr = toChapterStr;
        reference.to.chapter = reference.from.chapter;
      } else {
        const toChapter = parseInt(toChapterStr);
        if (!isNaN(toChapter)) {
          reference.to.chapter = toChapter;
        }
      }
    }
    if (toVerseStr) {
      const toVerse = parseInt(toVerseStr);
      if (!isNaN(toVerse)) {
        reference.to.verse = toVerse;
      }
    }
    return reference;
  });
}

function emptyReference(reference: Reference): boolean {
  return (
    !reference ||
    ((reference.chapter === null || reference.chapter === undefined) &&
      (reference.verse === null || reference.verse === undefined))
  );
}

function isDefined(val: any): boolean {
  return val !== null && val !== undefined;
}

/**
 * Cleans and validates a passage reference so that it can be properly formatted.
 * @param passage `PassageReference`, modified directly.
 * @param book Book of the Bible, used for chapter number rules.
 * @param language Language, used to set the book name.
 */
export function cleanPassageReference(passage: PassageReference, book: BookData, language: Language): void {
  passage.book = book.name[language];

  if (!passage.from) {
    passage.from = {};
  }
  if (!passage.to) {
    passage.to = {};
  }

  if (emptyReference(passage.from) && emptyReference(passage.to)) {
    // Getting the whole book.
    return;
  }

  if (!isDefined(passage.from.chapter)) {
    if (book.chapters !== 1) {
      throw new Error('Missing start chapter');
    }
  } else if (book.chapters === 1) {
    if (passage.from.chapter !== 1) {
      passage.from.verse = passage.from.chapter;
    }
    delete passage.from.chapter;
  } else if (passage.from.chapter < 1 || passage.from.chapter > book.chapters) {
    throw new Error('Chapter not found');
  }

  if (isDefined(passage.to.chapter)) {
    if (passage.to.chapter === passage.from.chapter) {
      delete passage.to.chapter;
    } else if (book.chapters === 1) {
      if (passage.to.chapter !== 1) {
        passage.to.verse = passage.to.chapter;
      }
      delete passage.to.chapter;
    } else if (passage.to.chapter < 1 || passage.to.chapter > book.chapters) {
      if (passage.to.chapter !== passage.from.chapter) {
        // Do not allow chapter number to exceed end of book.
        passage.to.chapter = book.chapters;
        if (isDefined(passage.to.verse)) {
          delete passage.to.verse;
        }
      } else {
        throw new Error('Chapter not found');
      }
    }
    if (isDefined(passage.from.verse) && passage.from.chapter !== passage.to.chapter && !isDefined(passage.to.verse)) {
      throw new Error('Must specify end verse in end chapter');
    }
  }

  if (isDefined(passage.from.verse) && passage.from.verse < 1) {
    throw new Error('Invalid start verse');
  }

  if (isDefined(passage.to.verse)) {
    if (passage.to.verse === passage.from.verse) {
      delete passage.to.verse;
    } else if (passage.to.verse < 1) {
      throw new Error('Invalid end verse');
    } else if (!isDefined(passage.from.verse)) {
      // Must assign the start verse since we have an end verse.
      passage.from.verse = 1;
      if (passage.from.chapter === passage.to.chapter && passage.to.verse === 1) {
        delete passage.to.verse;
      }
    }
  }

  if (isDefined(passage.from.chapter) && isDefined(passage.to.chapter) && passage.to.chapter < passage.from.chapter) {
    throw new Error('Invalid chapter range');
  }

  if (
    isDefined(passage.from.verse) &&
    isDefined(passage.to.verse) &&
    (!isDefined(passage.to.chapter) || passage.from.chapter === passage.to.chapter) &&
    passage.to.verse < passage.from.verse
  ) {
    throw new Error('Invalid verse range');
  }
}

function formatReference(reference: Reference): string {
  let str = '';
  if (reference.chapter !== null && reference.chapter !== undefined) {
    str += reference.chapter;
    if (reference.verse !== null && reference.verse !== undefined) {
      str += `:${reference.verse}`;
    }
  } else if (reference.verse !== null && reference.verse !== undefined) {
    str += reference.verse;
  }
  return str;
}

/**
 * Formats a `PassageReference` object as a string, assuming it has been cleaned using `cleanPassageReference`.
 * @param passage `PassageReference`.
 * @returns String passage reference.
 */
export function formatPassageReference(passage: PassageReference): string {
  let str = passage.book;
  if (emptyReference(passage.from) && emptyReference(passage.to)) {
    return str;
  }

  if (!emptyReference(passage.from)) {
    str += ` ${formatReference(passage.from)}`;
  }
  if (!emptyReference(passage.to)) {
    str += `-${formatReference(passage.to)}`;
  }
  return str;
}
