import { assert } from 'chai';
import { Suite } from 'mocha';

import { BibleGatewayWebScraper } from './scraper.js';

describe('BibleGatewayWebScraper', function (this: Suite) {
  this.slow(1000);

  describe('passages', () => {
    it('should return a single verse', async () => {
      const scraper = new BibleGatewayWebScraper('NIV');
      const passages = await scraper.passages('Genesis 1:1');
      assert.lengthOf(passages, 1);
      assert.equal(passages[0].reference, 'Genesis 1:1');
      const expected = 'In the beginning God created the heavens and the earth.';
      assert.equal(passages[0].text, expected);
    });

    it('should return multiple verses', async () => {
      const scraper = new BibleGatewayWebScraper('NIV');
      const passages = await scraper.passages('Exodus 14:21-22');
      assert.lengthOf(passages, 1);
      assert.equal(passages[0].reference, 'Exodus 14:21-22');
      const expected =
        '\u{00B2}\u{00B9} Then Moses stretched out his hand over the sea, and all that night the Lord drove the sea back with a strong east wind and turned it into dry land. The waters were divided, \u{00B2}\u{00B2} and the Israelites went through the sea on dry ground, with a wall of water on their right and on their left.';
      assert.equal(passages[0].text, expected);
    });

    it('should return multiple paragraphs with proper spacing', async () => {
      const scraper = new BibleGatewayWebScraper('NIV');
      const passages = await scraper.passages('Leviticus 9:15-17');
      assert.lengthOf(passages, 1);
      assert.equal(passages[0].reference, 'Leviticus 9:15-17');
      const expected =
        '\u{00B9}\u{2075} Aaron then brought the offering that was for the people. He took the goat for the people\u{2019}s sin offering and slaughtered it and offered it for a sin offering as he did with the first one.\n\n\u{00B9}\u{2076} He brought the burnt offering and offered it in the prescribed way. \u{00B9}\u{2077} He also brought the grain offering, took a handful of it and burned it on the altar in addition to the morning\u{2019}s burnt offering.';
      assert.equal(passages[0].text, expected);
    });

    it('should return a full chapter', async () => {
      const scraper = new BibleGatewayWebScraper('NIV');
      const passages = await scraper.passages('Esther 10');
      assert.lengthOf(passages, 1);
      assert.equal(passages[0].reference, 'Esther 10');
      const expected =
        'King Xerxes imposed tribute throughout the empire, to its distant shores. \u{00B2} And all his acts of power and might, together with a full account of the greatness of Mordecai, whom the king had promoted, are they not written in the book of the annals of the kings of Media and Persia? \u{00B3} Mordecai the Jew was second in rank to King Xerxes, preeminent among the Jews, and held in high esteem by his many fellow Jews, because he worked for the good of his people and spoke up for the welfare of all the Jews.';
      assert.equal(passages[0].text, expected);
    });

    it('should return multiple chapters together', async () => {
      const scraper = new BibleGatewayWebScraper('NIV');
      const passages = await scraper.passages('Psalm 1-3');
      assert.lengthOf(passages, 1);
      assert.equal(passages[0].reference, 'Psalm 1-3');
      const expected =
        '\u{00B9}   Blessed is the one\n      who does not walk in step with the wicked\n    or stand in the way that sinners take\n      or sit in the company of mockers,\n\u{00B2}   but whose delight is in the law of the Lord,\n      and who meditates on his law day and night.\n\u{00B3}   That person is like a tree planted by streams of water,\n      which yields its fruit in season\n    and whose leaf does not wither—\n      whatever they do prospers.\n\n\u{2074}   Not so the wicked!\n      They are like chaff\n      that the wind blows away.\n\u{2075}   Therefore the wicked will not stand in the judgment,\n      nor sinners in the assembly of the righteous.\n\n\u{2076}   For the Lord watches over the way of the righteous,\n      but the way of the wicked leads to destruction.\n\n\u{00B9}   Why do the nations conspire\n      and the peoples plot in vain?\n\u{00B2}   The kings of the earth rise up\n      and the rulers band together\n      against the Lord and against his anointed, saying,\n\u{00B3}   “Let us break their chains\n      and throw off their shackles.”\n\n\u{2074}   The One enthroned in heaven laughs;\n      the Lord scoffs at them.\n\u{2075}   He rebukes them in his anger\n      and terrifies them in his wrath, saying,\n\u{2076}   “I have installed my king\n      on Zion, my holy mountain.”\n\n\u{2077} I will proclaim the Lord\u{2019}s decree:\n\n    He said to me, “You are my son;\n      today I have become your father.\n\u{2078}   Ask me,\n      and I will make the nations your inheritance,\n      the ends of the earth your possession.\n\u{2079}   You will break them with a rod of iron;\n      you will dash them to pieces like pottery.”\n\n\u{00B9}\u{2070}  Therefore, you kings, be wise;\n      be warned, you rulers of the earth.\n\u{00B9}\u{00B9}  Serve the Lord with fear\n      and celebrate his rule with trembling.\n\u{00B9}\u{00B2}  Kiss his son, or he will be angry\n      and your way will lead to your destruction,\n    for his wrath can flare up in a moment.\n      Blessed are all who take refuge in him.\n\n\u{00B9}   Lord, how many are my foes!\n      How many rise up against me!\n\u{00B2}   Many are saying of me,\n      “God will not deliver him.”\n\n\u{00B3}   But you, Lord, are a shield around me,\n      my glory, the One who lifts my head high.\n\u{2074}   I call out to the Lord,\n      and he answers me from his holy mountain.\n\n\u{2075}   I lie down and sleep;\n      I wake again, because the Lord sustains me.\n\u{2076}   I will not fear though tens of thousands\n      assail me on every side.\n\n\u{2077}   Arise, Lord!\n      Deliver me, my God!\n    Strike all my enemies on the jaw;\n      break the teeth of the wicked.\n\n\u{2078}   From the Lord comes deliverance.\n      May your blessing be on your people.';
      assert.equal(passages[0].text, expected);
    });

    it('should preserve poem formatting', async () => {
      const scraper = new BibleGatewayWebScraper('NIV');
      const passages = await scraper.passages('Job 25');
      assert.lengthOf(passages, 1);
      assert.equal(passages[0].reference, 'Job 25');
      const expected =
        'Then Bildad the Shuhite replied:\n\n\u{00B2}   “Dominion and awe belong to God;\n      he establishes order in the heights of heaven.\n\u{00B3}   Can his forces be numbered?\n      On whom does his light not rise?\n\u{2074}   How then can a mortal be righteous before God?\n      How can one born of woman be pure?\n\u{2075}   If even the moon is not bright\n      and the stars are not pure in his eyes,\n\u{2076}   how much less a mortal, who is but a maggot—\n      a human being, who is only a worm!”';
      assert.equal(passages[0].text, expected);
    });

    it('should parse full reference', async () => {
      const scraper = new BibleGatewayWebScraper('NIV');
      const passages = await scraper.passages('matt 1:17');
      assert.lengthOf(passages, 1);
      assert.equal(passages[0].reference, 'Matthew 1:17');
    });

    it('should return multiple passages', async () => {
      const scraper = new BibleGatewayWebScraper('NIV');
      const passages = await scraper.passages('Matthew 5:3;Luke 6:20');
      assert.lengthOf(passages, 2);
      assert.equal(passages[0].reference, 'Matthew 5:3');
      assert.equal(passages[1].reference, 'Luke 6:20');
      const matthew = '\u{00B3}   “Blessed are the poor in spirit,\n      for theirs is the kingdom of heaven.';
      const luke =
        '\u{00B2}\u{2070} Looking at his disciples, he said:\n\n    “Blessed are you who are poor,\n      for yours is the kingdom of God.';
      assert.equal(passages[0].text, matthew);
      assert.equal(passages[1].text, luke);
    });

    it('should return empty list when no passages found', async () => {
      const scraper = new BibleGatewayWebScraper('NIV');
      const passages = await scraper.passages('not found');
      assert.lengthOf(passages, 0);
    });

    it('should remove verse numbers', async () => {
      const scraper = new BibleGatewayWebScraper('NIV', { showVerseNumbers: false });
      const passages = await scraper.passages('Mark 1:9-13');
      assert.lengthOf(passages, 1);
      const expected =
        'At that time Jesus came from Nazareth in Galilee and was baptized by John in the Jordan. Just as Jesus was coming up out of the water, he saw heaven being torn open and the Spirit descending on him like a dove. And a voice came from heaven: “You are my Son, whom I love; with you I am well pleased.”\n\nAt once the Spirit sent him out into the wilderness, and he was in the wilderness forty days, being tempted by Satan. He was with the wild animals, and angels attended him.';
      assert.equal(passages[0].text, expected);
    });

    it('should search different versions', async () => {
      let scraper = new BibleGatewayWebScraper('NIV');
      let passages = await scraper.passages('Deuteronomy 6:5');
      assert.lengthOf(passages, 1);
      const niv =
        '\u{2075} Love the Lord your God with all your heart and with all your soul and with all your strength.';
      assert.equal(passages[0].text, niv);

      scraper = new BibleGatewayWebScraper('NLT');
      passages = await scraper.passages('Deuteronomy 6:5');
      const nlt =
        '\u{2075} And you must love the Lord your God with all your heart, all your soul, and all your strength.';
      assert.equal(passages[0].text, nlt);

      scraper = new BibleGatewayWebScraper('MSG');
      passages = await scraper.passages('Deuteronomy 6:5');
      const msg =
        '\u{2075} Love God, your God, with your whole heart: love him with all that\u{2019}s in you, love him with all you\u{2019}ve got!';
      assert.equal(passages[0].text, msg);
    });

    it('should remove paragraph spacing', async () => {
      const scraper = new BibleGatewayWebScraper('NIV', { paragraphSpacing: 0 });
      const passages = await scraper.passages('1 Samuel 3:4-5');
      assert.lengthOf(passages, 1);
      const expected =
        '\u{2074} Then the Lord called Samuel. Samuel answered, “Here I am.” \u{2075} And he ran to Eli and said, “Here I am; you called me.” But Eli said, “I did not call; go back and lie down.” So he went and lay down.';
      assert.equal(passages[0].text, expected);
    });

    it('should expand paragraph spacing', async () => {
      const scraper = new BibleGatewayWebScraper('NIV', { paragraphSpacing: 3 });
      const passages = await scraper.passages('2 Samuel 1:3-4');
      assert.lengthOf(passages, 1);
      const expected =
        '\u{00B3} “Where have you come from?” David asked him.\n\n\nHe answered, “I have escaped from the Israelite camp.”\n\n\n\u{2074} “What happened?” David asked. “Tell me.”\n\n\n“The men fled from the battle,” he replied. “Many of them fell and died. And Saul and his son Jonathan are dead.”';
      assert.equal(passages[0].text, expected);
    });

    it('should remove unicode punctuation', async () => {
      const scraper = new BibleGatewayWebScraper('NIV', { allowUnicodePunctuation: false });
      const passages = await scraper.passages('1 Kings 9:9');
      assert.lengthOf(passages, 1);
      const expected =
        "\u{2079} People will answer, 'Because they have forsaken the Lord their God, who brought their ancestors out of Egypt, and have embraced other gods, worshiping and serving them-that is why the Lord brought all this disaster on them.'\"";
      assert.equal(passages[0].text, expected);
    });

    it('should preserve small caps', async () => {
      const scraper = new BibleGatewayWebScraper('NIV', { preserveSmallCaps: true });
      const passages = await scraper.passages('Exodus 3:14;Exodus 6:2');
      assert.lengthOf(passages, 2);
      const first =
        '\u{00B9}\u{2074} God said to Moses, “I AM WHO I AM. This is what you are to say to the Israelites: \u{2018}I AM has sent me to you.\u{2019}”';
      assert.equal(passages[0].text, first);
      const second = '\u{00B2} God also said to Moses, “I am the LORD.';
      assert.equal(passages[1].text, second);
    });

    it('should preserve poetry spacing', async () => {
      const scraper = new BibleGatewayWebScraper('NIV');
      const passages = await scraper.passages('Matthew 6:9-13');
      assert.lengthOf(passages, 1);
      const expected =
        '\u{2079} “This, then, is how you should pray:\n\n    “\u{2018}Our Father in heaven,\n    hallowed be your name,\n\u{00B9}\u{2070}  your kingdom come,\n    your will be done,\n      on earth as it is in heaven.\n\u{00B9}\u{00B9}  Give us today our daily bread.\n\u{00B9}\u{00B2}  And forgive us our debts,\n      as we also have forgiven our debtors.\n\u{00B9}\u{00B3}  And lead us not into temptation,\n      but deliver us from the evil one.\u{2019}';
      assert.equal(passages[0].text, expected);
    });

    it('should preserve poetry spacing without verse numbers', async () => {
      const scraper = new BibleGatewayWebScraper('NIV', { showVerseNumbers: false });
      const passages = await scraper.passages('Matthew 6:9-13');
      assert.lengthOf(passages, 1);
      const expected =
        '“This, then, is how you should pray:\n\n    “\u{2018}Our Father in heaven,\n    hallowed be your name,\n    your kingdom come,\n    your will be done,\n      on earth as it is in heaven.\n    Give us today our daily bread.\n    And forgive us our debts,\n      as we also have forgiven our debtors.\n    And lead us not into temptation,\n      but deliver us from the evil one.\u{2019}';
      assert.equal(passages[0].text, expected);
    });

    it('should add verse one', async () => {
      const scraper = new BibleGatewayWebScraper('NIV', { showVerseNumberForVerseOne: true });
      const passages = await scraper.passages('Acts 2:1-2');
      assert.lengthOf(passages, 1);
      const expected =
        '\u{00B9} When the day of Pentecost came, they were all together in one place. \u{00B2} Suddenly a sound like the blowing of a violent wind came from heaven and filled the whole house where they were sitting.';
      assert.equal(passages[0].text, expected);
    });

    it('should preserve poetry spacing in Psalms ESV', async () => {
      const scraper = new BibleGatewayWebScraper('ESV');
      const passages = await scraper.passages('Psalm 1:1-2');
      assert.lengthOf(passages, 1);
      assert.equal(passages[0].reference, 'Psalm 1:1-2');
      const expected =
        '    Blessed is the man\n      who walks not in the counsel of the wicked,\n    nor stands in the way of sinners,\n      nor sits in the seat of scoffers;\n\u{00B2}   but his delight is in the law of the Lord,\n      and on his law he meditates day and night.';
      assert.equal(passages[0].text, expected);
    });

    it('should return a single verse in Spanish', async () => {
      const scraper = new BibleGatewayWebScraper('RVC');
      const passages = await scraper.passages('Romanos 12:2');
      assert.lengthOf(passages, 1);
      assert.equal(passages[0].reference, 'Romanos 12:2');
      const expected =
        '\u{00B2} Y no adopten las costumbres de este mundo, sino transfórmense por medio de la renovación de su mente, para que comprueben cuál es la voluntad de Dios, lo que es bueno, agradable y perfecto.';
      assert.equal(passages[0].text, expected);
    });

    it('should return a single verse in Chinese', async () => {
      const scraper = new BibleGatewayWebScraper('CUVS');
      const passages = await scraper.passages('Romans 12:2');
      assert.lengthOf(passages, 1);
      assert.equal(passages[0].reference, '羅 馬 書 12:2');
      const expected =
        '\u{00B2} 不 要 效 法 这 个 世 界 ， 只 要 心 意 更 新 而 变 化 ， 叫 你 们 察 验 何 为 神 的 善 良 、 纯 全 、 可 喜 悦 的 旨 意 。';
      assert.equal(passages[0].text, expected);
    });

    it('should return a single verse in Korean', async () => {
      const scraper = new BibleGatewayWebScraper('KLB');
      const passages = await scraper.passages('Romans 12:2');
      assert.lengthOf(passages, 1);
      assert.equal(passages[0].reference, '로마서 12:2');
      const expected =
        '\u{00B2} 여러분은 이 세상을 본받지 말고 마음을 새롭게 하여 변화를 받으십시오. 그러면 하나님의 선하시고 기뻐하시고 완전하신 뜻이 무엇인지를 알게 될 것입니다.';
      assert.equal(passages[0].text, expected);
    });

    it('should return a single verse in Japanese', async () => {
      const scraper = new BibleGatewayWebScraper('JLB');
      const passages = await scraper.passages('Romans 12:2');
      assert.lengthOf(passages, 1);
      assert.equal(passages[0].reference, 'ローマ人への手紙 12:2');
      const expected =
        '\u{00B2} この世の人々の生活や考え方をまねてはいけません。むしろ、神に喜ばれることは何かを思いながら、なすこと考えることすべての面で生き生きとした、全く新しい人となりなさい。';
      assert.equal(passages[0].text, expected);
    });

    it('should return a single verse in Portuguese', async () => {
      const scraper = new BibleGatewayWebScraper('NVT');
      const passages = await scraper.passages('Romans 12:2');
      assert.lengthOf(passages, 1);
      assert.equal(passages[0].reference, 'Romanos 12:2');
      const expected =
        '\u{00B2} Não imitem o comportamento e os costumes deste mundo, mas deixem que Deus os transforme por meio de uma mudança em seu modo de pensar, a fim de que experimentem a boa, agradável e perfeita vontade de Deus para vocês.';
      assert.equal(passages[0].text, expected);
    });

    it('should return a single verse in French', async () => {
      const scraper = new BibleGatewayWebScraper('LSG');
      const passages = await scraper.passages('Romans 12:2');
      assert.lengthOf(passages, 1);
      assert.equal(passages[0].reference, 'Romains 12:2');
      const expected =
        "\u{00B2} Ne vous conformez pas au siècle présent, mais soyez transformés par le renouvellement de l'intelligence, afin que vous discerniez quelle est la volonté de Dieu, ce qui est bon, agréable et parfait.";
      assert.equal(passages[0].text, expected);
    });

    it('should return a single verse in German', async () => {
      const scraper = new BibleGatewayWebScraper('LUTH1545');
      const passages = await scraper.passages('Romans 12:2');
      assert.lengthOf(passages, 1);
      assert.equal(passages[0].reference, 'Roemer 12:2');
      const expected =
        '\u{00B2} Und stellet euch nicht dieser Welt gleich, sondern verändert euch durch die Erneuerung eures Sinnes, auf daß ihr prüfen möget, welches da sei der gute, wohlgefällige und vollkommene Gotteswille.';
      assert.equal(passages[0].text, expected);
    });

    it('should return a single verse in Italian', async () => {
      const scraper = new BibleGatewayWebScraper('NR2006');
      const passages = await scraper.passages('Romans 12:2');
      assert.lengthOf(passages, 1);
      assert.equal(passages[0].reference, 'Romani 12:2');
      const expected =
        '\u{00B2} Non conformatevi a questo mondo, ma siate trasformati mediante il rinnovamento della vostra mente, affinché conosciate per esperienza quale sia la volontà di Dio, la buona, gradita e perfetta volontà.';
      assert.equal(passages[0].text, expected);
    });

    it('should return a single verse in Hindi', async () => {
      const scraper = new BibleGatewayWebScraper('ERV-HI');
      const passages = await scraper.passages('Romans 12:2');
      assert.lengthOf(passages, 1);
      assert.equal(passages[0].reference, 'रोमियों 12:2');
      const expected =
        '\u{00B2} अब और आगे इस दुनिया की रीति पर मत चलो बल्कि अपने मनों को नया करके अपने आप को बदल डालो ताकि तुम्हें पता चल जाये कि परमेश्वर तुम्हारे लिए क्या चाहता है। यानी जो उत्तम है, जो उसे भाता है और जो सम्पूर्ण है।';
      assert.equal(passages[0].text, expected);
    });
  });

  describe('votd', () => {
    it('should return verse of the day', async () => {
      const scraper = new BibleGatewayWebScraper('NIV');
      const votd = await scraper.votd();
      const passages = await scraper.passages(votd.reference);
      assert.lengthOf(passages, 1);
      assert.equal(passages[0].reference, votd.reference);
      assert.equal(passages[0].text, votd.text);
    });
  });
});
