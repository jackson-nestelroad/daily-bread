# DailyBread

<a href="https://www.npmjs.com/package/daily-bread"><img src="https://img.shields.io/npm/v/daily-bread.svg?maxAge=3600" alt="NPM version" /></a>

_This project is not affiliated with [Bible Gateway](http://biblegateway.com)._

**Daily Bread** is a TypeScript library for reading the Bible. It is currently implemented by reading from [Bible Gateway](http://biblegateway.com).

```ts
const bible = new DailyBread();
const passage = await bible.getOne('Matt 6:9-13');
console.log(passage.text);
```

Output:

```
⁹ “This, then, is how you should pray:

    “‘Our Father in heaven,
    hallowed be your name,
¹⁰  your kingdom come,
    your will be done,
      on earth as it is in heaven.
¹¹  Give us today our daily bread.
¹²  And forgive us our debts,
      as we also have forgiven our debtors.
¹³  And lead us not into temptation,
      but deliver us from the evil one.’
```

## Install

To install, simply run the following command:

```
npm install --save daily-bread
```

## Usage

## `DailyBread`

DailyBread provides a simple library for reading one or more passages of the Bible in one of many supported versions. The `DailyBread` class is the primary interface for searching for Bible verses.

### Finding a single passage or verse

You can search for a single passage by string:

```ts
import { DailyBread } from 'daily-bread';

const bible = new DailyBread();
const passage = await bible.getOne('Matt 11:28');
console.log(passage.text);
```

Output:

```
²⁸ “Come to me, all you who are weary and burdened, and I will give you rest.
```

The library will even preserve spacing for poetry:

```ts
const passage = await bible.getOne('Psalm 22:1-2');
console.log(passage.text);
```

Output:

```
¹ My God, my God, why have you forsaken me?
    Why are you so far from saving me,
    so far from my cries of anguish?
² My God, I cry out by day, but you do not answer,
    by night, but I find no rest.
```

You may also search using a reference object:

```ts
const passages = await bible.getOne({
  book: 'Genesis',
  from: { chapter: 1, verse: 1 },
  to: { chapter: 2, verse: 3 },
});
```

The library provides an enumeration for books of the Bible, allowing you to read the Bible completely programmatically:

```ts
import { CanonBook, DailyBread } from 'daily-bread';

...

const passage = await bible.getOne({
  book: CanonBook.Matthew,
  from: { chapter: 5 },
  to: { chapter: 7 },
});
```

### Finding multiple passages

You can search for multiple passages at a time. As above, searches can be a single string or an array of references:

```ts
const passages = await bible.get('Matthew 7:12;Luke 6:31');
console.log(passages);

// Equivalently:
const passages = await bible.get([
  {
    book: CanonBook.Matthew,
    from: { chapter: 7, verse: 12 },
  },
  {
    book: CanonBook.Luke,
    from: { chapter: 6, verse: 31 },
  },
]);
console.log(passages);
```

Output:

```
[
  {
    reference: 'Matthew 7:12',
    text: '¹² So in everything, do to others what you would have them do to you, for this sums up the Law and the Prophets.'
  },
  {
    reference: 'Luke 6:31',
    text: '³¹ Do to others as you would have them do to you.'
  }
]
```

### Setting Bible version

`DailyBread` currently supports several popular English versions of the Bible: CEB, ESV, KJV, LEB, MSG, NIV, NKJV, and NLT.

The version currently being read can be changed directly on the `DailyBread` object:

```ts
// Check if version is supported before setting.
if (bible.isSupportedVersion('NLT')) {
  bible.setVersion('NLT');
}

// Set version directly.
bible.setVersion('esv');
```

### Customizing passage formatting

There are several options for customizing the format of your passages:

```ts
bible.setFormatting({
  showVerseNumbers: false,
  preserveSmallCaps: true,
});
const passage = bible.getOne('Ex 3:14');
console.log(passage);
```

Output:

```
{
  reference: 'Exodus 3:14',
  text: 'God said to Moses, “I AM WHO I AM. This is what you are to say to the Israelites: ‘I AM has sent me to you.’”'
}
```

## `BibleGatewayWebScraper`

The `DailyBread` class is intended to be a standard library for reading the Bible programmatically. For more flexibility, you may use the `BibleGatewayWebScraper` directly, which allows direct access to the Bible Gateway website.

```ts
const scraper = new BibleGatewayWebScraper('ESV');
const passages = await scraper.passages('1 cor 13:4;gal 6:9');
console.log(passages);
```

Output:

```
[
  {
    reference: '1 Corinthians 13:4',
    text: '⁴ Love is patient and kind; love does not envy or boast; it is not arrogant'
  },
  {
    reference: 'Galatians 6:9',
    text: '⁹ And let us not grow weary of doing good, for in due season we will reap, if we do not give up.'
  }
]
```

## Features

- `DailyBread` class
  - Read one or more passages from the Bible from a supported version with customizable formatting.
  - Get information about a canon or deuterocanon book of the Bible.
- `BibleGatewayWebScraper` class
  - Read passages from Bible Gateway for any version with customizable formatting.

## Planned Features

- Read Verse of the Day.
- Search for verses by word.
- Support for more languages.
