import { assert } from 'chai';
import { SinonMock, mock } from 'sinon';

import { CanonBook } from './bible';
import { DailyBread } from './daily-bread';
import { Passage } from './passage';

function expectPassageRead(scraper: SinonMock, passage: Passage) {
  scraper
    .expects('passages')
    .withExactArgs(passage.reference)
    .once()
    .returns(new Promise(resolve => resolve([passage])));
}

describe('DailyBread', () => {
  describe('get', () => {
    it('should make a single read for a single chapter', async () => {
      const bible = new DailyBread();
      const scraper = mock(bible['scraper']);
      expectPassageRead(scraper, {
        reference: '2 Samuel 7:1-17',
        text: "The Lord's Covenant with David",
      });
      const passages = await bible.get('2 sam 7:1-17');
      assert.deepEqual(passages, [
        {
          reference: '2 Samuel 7:1-17',
          text: "The Lord's Covenant with David",
        },
      ]);
      scraper.verify();
    });

    it('should make two reads for two chapters', async () => {
      const bible = new DailyBread();
      const scraper = mock(bible['scraper']);
      expectPassageRead(scraper, {
        reference: 'Isaiah 52:13-200',
        text: 'Suffering Servant Part 1',
      });
      expectPassageRead(scraper, {
        reference: 'Isaiah 53:1-12',
        text: 'Suffering Servant Part 2',
      });
      const passages = await bible.get('Isa 52:13-53:12');
      assert.deepEqual(passages, [
        {
          reference: 'Isaiah 52:13-53:12',
          text: 'Suffering Servant Part 1\n\nSuffering Servant Part 2',
        },
      ]);
      scraper.verify();
    });

    it('should make multiple reads for multiple chapters', async () => {
      const bible = new DailyBread();
      const scraper = mock(bible['scraper']);
      expectPassageRead(scraper, {
        reference: 'Psalm 1-5',
        text: 'Psalm 1-5',
      });
      expectPassageRead(scraper, {
        reference: 'Psalm 6-10',
        text: 'Psalm 6-10',
      });
      expectPassageRead(scraper, {
        reference: 'Psalm 11-15',
        text: 'Psalm 11-15',
      });
      const passages = await bible.get({ book: 'Psalms', from: { chapter: 1 }, to: { chapter: 15 } });
      assert.deepEqual(passages, [
        {
          reference: 'Psalm 1-15',
          text: 'Psalm 1-5\n\nPsalm 6-10\n\nPsalm 11-15',
        },
      ]);
      scraper.verify();
    });

    it('should make multiple reads for entire book', async () => {
      const bible = new DailyBread();
      const scraper = mock(bible['scraper']);
      expectPassageRead(scraper, {
        reference: 'Nehemiah 1-5',
        text: 'Nehemiah 1-5',
      });
      expectPassageRead(scraper, {
        reference: 'Nehemiah 6-10',
        text: 'Nehemiah 6-10',
      });
      expectPassageRead(scraper, {
        reference: 'Nehemiah 11-13',
        text: 'Nehemiah 11-13',
      });
      const passages = await bible.get(CanonBook.Nehemiah);
      assert.deepEqual(passages, [
        {
          reference: 'Nehemiah',
          text: 'Nehemiah 1-5\n\nNehemiah 6-10\n\nNehemiah 11-13',
        },
      ]);
      scraper.verify();
    });

    it('should make multiple reads for multiple passages in one string', async () => {
      const bible = new DailyBread();
      const scraper = mock(bible['scraper']);
      expectPassageRead(scraper, {
        reference: 'Matthew 6:19-21',
        text: 'Treasures',
      });
      expectPassageRead(scraper, {
        reference: 'Mark 4:21-25',
        text: 'Lamp',
      });
      const passages = await bible.get('Matt 6:19-21 ; mark 4:21-25');
      assert.deepEqual(passages, [
        {
          reference: 'Matthew 6:19-21',
          text: 'Treasures',
        },
        {
          reference: 'Mark 4:21-25',
          text: 'Lamp',
        },
      ]);
      scraper.verify();
    });

    it('should make multiple reads for multiple passages in an array', async () => {
      const bible = new DailyBread();
      const scraper = mock(bible['scraper']);
      expectPassageRead(scraper, {
        reference: 'Ephesians 2:1-10',
        text: 'By grace through faith',
      });
      expectPassageRead(scraper, {
        reference: 'Ephesians 5:1-2',
        text: 'Walk in love',
      });
      const passages = await bible.get([
        { book: CanonBook.Ephesians, from: { chapter: 2 }, to: { verse: 10 } },
        'Eph 5:1-2',
      ]);
      assert.deepEqual(passages, [
        {
          reference: 'Ephesians 2:1-10',
          text: 'By grace through faith',
        },
        {
          reference: 'Ephesians 5:1-2',
          text: 'Walk in love',
        },
      ]);
      scraper.verify();
    });

    it('should fetch start and end chapter separately', async () => {
      const bible = new DailyBread();
      const scraper = mock(bible['scraper']);
      expectPassageRead(scraper, {
        reference: 'Philippians 1:3-200',
        text: 'Philippians 1',
      });
      expectPassageRead(scraper, {
        reference: 'Philippians 2-3',
        text: 'Philippians 2-3',
      });
      expectPassageRead(scraper, {
        reference: 'Philippians 4:1-20',
        text: 'Philippians 4',
      });
      const passages = await bible.get('Phil 1:3-4:20');
      assert.deepEqual(passages, [
        {
          reference: 'Philippians 1:3-4:20',
          text: 'Philippians 1\n\nPhilippians 2-3\n\nPhilippians 4',
        },
      ]);
      scraper.verify();
    });

    it('should join passages together using formatting options', async () => {
      const bible = new DailyBread();
      bible.setFormatting({ paragraphSpacing: 1 });
      const scraper = mock(bible['scraper']);
      expectPassageRead(scraper, {
        reference: 'Romans 12-14',
        text: 'Romans 12-14',
      });
      expectPassageRead(scraper, {
        reference: 'Romans 15:1-13',
        text: 'Romans 15:1-13',
      });
      const passages = await bible.get({
        book: 'Romans',
        from: { chapter: 12, verse: 1 },
        to: { chapter: 15, verse: 13 },
      });
      assert.deepEqual(passages, [
        {
          reference: 'Romans 12:1-15:13',
          text: 'Romans 12-14\nRomans 15:1-13',
        },
      ]);
      scraper.verify();
    });

    it('returns empty array for no reference in input', async () => {
      const bible = new DailyBread();
      const scraper = mock(bible['scraper']);
      const passages = await bible.get('');
      assert.isEmpty(passages);
      scraper.verify();
    });
  });

  describe('getOne', () => {
    it('ignores multiple passages', async () => {
      const bible = new DailyBread();
      const scraper = mock(bible['scraper']);
      expectPassageRead(scraper, {
        reference: 'Matthew 1:1-200',
        text: 'Genealogy of Jesus',
      });
      const passage = await bible.getOne('Matthew 1;Mark 1;Luke 1;John 1');
      assert.deepEqual(passage, {
        reference: 'Matthew 1',
        text: 'Genealogy of Jesus',
      });
      scraper.verify();
    });

    it('returns null for no reference in input', async () => {
      const bible = new DailyBread();
      const scraper = mock(bible['scraper']);
      const passage = await bible.getOne('');
      assert.isNull(passage);
      scraper.verify();
    });
  });

  describe('isSupportedVersion', () => {
    it('returns true for supported version', () => {
      const bible = new DailyBread();
      assert.isTrue(bible.isSupportedVersion('niv'));
      assert.isTrue(bible.isSupportedVersion('NLT'));
      assert.isTrue(bible.isSupportedVersion('Esv'));
    });

    it('returns false for unsupported version', () => {
      const bible = new DailyBread();
      assert.isFalse(bible.isSupportedVersion('UNK'));
      assert.isFalse(bible.isSupportedVersion(''));
    });
  });
});
