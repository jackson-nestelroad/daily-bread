import { Language } from './bible.js';
import { CaseInsensitiveMap } from './util/case-insensitive-map.js';

// The starting point for the versions we support is https://www.biblegateway.com/versions/?interface=print.

/**
 * Data about a single version of the Bible.
 *
 * For internal configuration only.
 */
interface InternalVersionData {
  abbreviation: string;
  name: string;
  deuterocanon?: boolean;
}

/**
 * Data about a single version of the Bible.
 */
export interface VersionData extends InternalVersionData {
  language: Language;
}

/**
 * Type that maps a language to all of its supported versions.
 */
export type VersionsDictionary = { [language in Language]: CaseInsensitiveMap<InternalVersionData> };

/**
 * Dictionary of all supported versions by language.
 */
export const Versions: VersionsDictionary = {
  [Language.English]: new CaseInsensitiveMap([
    [
      'CEB',
      {
        abbreviation: 'CEB',
        name: 'Common English Bible',
        deuterocanon: true,
      },
    ],
    [
      'ESV',
      {
        abbreviation: 'ESV',
        name: 'English Standard Version',
      },
    ],
    [
      'KJV',
      {
        abbreviation: 'KJV',
        name: 'King James Version',
      },
    ],
    [
      'LEB',
      {
        abbreviation: 'LEB',
        name: 'Lexham English Bible',
      },
    ],
    [
      'MSG',
      {
        abbreviation: 'MSG',
        name: 'The Message',
      },
    ],
    [
      'NIV',
      {
        abbreviation: 'NIV',
        name: 'New International Version',
      },
    ],
    [
      'NKJV',
      {
        abbreviation: 'NKJV',
        name: 'New King James Version',
      },
    ],
    [
      'NLT',
      {
        abbreviation: 'NLT',
        name: 'New Living Translation',
      },
    ],
  ]),
};

/**
 * The default version of the Bible.
 */
export const DefaultVersion = 'NIV';

/**
 * Finds a supported version of the Bible by abbreviation.
 * @param abbreviation Version abbreviation (e.g., NIV, ESV, MSG, etc.).
 * @returns `VersionData` for the version if it is supported. `null` if unsupported.
 */
export function findVersion(abbreviation: string): VersionData | null {
  for (const language of Object.values(Language)) {
    const data = Versions[language]?.get(abbreviation);
    if (data) {
      return {
        ...data,
        language,
      };
    }
  }
  return null;
}
