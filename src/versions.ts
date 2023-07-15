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
  [Language.Spanish]: new CaseInsensitiveMap([
    [
      'NTV',
      {
        abbreviation: 'NTV',
        name: 'Nueva Traducción Viviente',
      },
    ],
    [
      'NVI',
      {
        abbreviation: 'NVI',
        name: 'Nueva Versión Internacional',
      },
    ],
    [
      'RVC',
      {
        abbreviation: 'RVC',
        name: 'Reina Valera Contemporánea',
      },
    ],
    [
      'RVR1960',
      {
        abbreviation: 'RVR1960',
        name: 'Reina-Valera 1960',
      },
    ],
    [
      'RVA',
      {
        abbreviation: 'RVA',
        name: 'Reina-Valera Antigua',
      },
    ],
  ]),
  [Language.Chinese]: new CaseInsensitiveMap([
    [
      'CCB',
      {
        abbreviation: 'CCB',
        name: 'Chinese Contemporary Bible (Simplified)',
      },
    ],
    [
      'CCBT',
      {
        abbreviation: 'CCBT',
        name: 'Chinese Contemporary Bible (Traditional)',
      },
    ],
    [
      'CNVS',
      {
        abbreviation: 'CNVS',
        name: 'Chinese New Version (Simplified)',
      },
    ],
    [
      'CNVT',
      {
        abbreviation: 'CNVT',
        name: 'Chinese New Version (Traditional)',
      },
    ],
    [
      'CUVS',
      {
        abbreviation: 'CUVS',
        name: 'Chinese Union Version (Simplified)',
      },
    ],
    [
      'CUV',
      {
        abbreviation: 'CUV',
        name: 'Chinese Union Version (Traditional)',
      },
    ],
    [
      'CUVMPS',
      {
        abbreviation: 'CUVMPS',
        name: 'Chinese Union Version Modern Punctuation (Simplified)',
      },
    ],
    [
      'CUVMPT',
      {
        abbreviation: 'CUVMPT',
        name: 'Chinese Union Version Modern Punctuation (Traditional)',
      },
    ],
  ]),
  [Language.Korean]: new CaseInsensitiveMap([
    [
      'KLB',
      {
        abbreviation: 'KLB',
        name: 'Korean Living Bible',
      },
    ],
  ]),
  [Language.Japanese]: new CaseInsensitiveMap([
    [
      'JLB',
      {
        abbreviation: 'JLB',
        name: 'Japenese Living Bible',
      },
    ],
  ]),
  [Language.Portuguese]: new CaseInsensitiveMap([
    [
      'ARC',
      {
        abbreviation: 'ARC',
        name: 'Almeida Revista e Corrigida 2009',
      },
    ],
    [
      'NVT',
      {
        abbreviation: 'NVT',
        name: 'Nova Versão Transformadora',
      },
    ],
    [
      'NVI-PT',
      {
        abbreviation: 'NVI-PT',
        name: 'Nova Versão Internacional',
      },
    ],
  ]),
  [Language.French]: new CaseInsensitiveMap([
    [
      'LSG',
      {
        abbreviation: 'LSG',
        name: 'Louis Segond',
      },
    ],
    [
      'NEG1979',
      {
        abbreviation: 'NEG1979',
        name: 'Nouvelle Edition de Genève \u{2013} NEG1979',
      },
    ],
  ]),
  [Language.German]: new CaseInsensitiveMap([
    [
      'HOF',
      {
        abbreviation: 'HOF',
        name: 'Hoffnung für Alle',
      },
    ],
    [
      'LUTH1545',
      {
        abbreviation: 'LUTH1545',
        name: 'Luther Bibel 1545',
      },
    ],
  ]),
  [Language.Italian]: new CaseInsensitiveMap([
    [
      'CEI',
      {
        abbreviation: 'CEI',
        name: 'Conferenza Episcopale Italiana',
        deuterocanon: true,
      },
    ],
    [
      'NR2006',
      {
        abbreviation: 'NR2006',
        name: 'Nuova Riveduta 2006',
      },
    ],
  ]),
  [Language.Hindi]: new CaseInsensitiveMap([
    [
      'ERV-HI',
      {
        abbreviation: 'ERV-HI',
        name: 'Hindi Bible: Easy-to-Read Version',
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
