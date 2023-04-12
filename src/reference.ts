import { BookData, Language } from './bible';

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
  /((?:\d+\s*)?[^\s\d:,;.-][^\d:,;.-]*)\s*(?:(\d+)(?::(\d+))?(?:\s*-\s*(\d+)(?::(\d+))?)?)?/g;

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

  if ((passage.from.chapter === null || passage.from.chapter === undefined) && book.chapters !== 1) {
    throw new Error('Missing start chapter');
  } else if (passage.from.chapter !== null && passage.from.chapter !== undefined && book.chapters === 1) {
    delete passage.from.chapter;
  }

  if (passage.to.chapter !== null && passage.to.chapter !== undefined) {
    if (passage.to.chapter === passage.from.chapter || book.chapters === 1) {
      delete passage.to.chapter;
    }
    if (
      passage.from.verse &&
      passage.from.chapter !== passage.to.chapter &&
      (passage.to.verse == null || passage.to.verse === undefined)
    ) {
      throw new Error('Must specify end verse in end chapter');
    }
  }

  if (passage.to.verse !== null && passage.to.verse !== undefined) {
    if (passage.to.verse === passage.from.verse) {
      delete passage.to.verse;
    } else if (passage.from.verse === null || passage.from.verse === undefined) {
      // Must assign the start verse since we have an end verse.
      passage.from.verse = 1;
    }
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
