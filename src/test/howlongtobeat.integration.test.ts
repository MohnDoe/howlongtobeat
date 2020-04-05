import * as chai from 'chai';

import { HowLongToBeatService } from '../main/howlongtobeat';

const assert = chai.assert;

describe('Integration-Testing HowLongToBeatService', () => {

  describe('Test for detail()', () => {

    it('should load entry for 2224 (Dark Souls)', () => {
      return new HowLongToBeatService().detail('2224').then((entry) => {
        console.log(entry);
        assert.isNotNull(entry);
        assert.strictEqual(entry.id, '2224');
        assert.strictEqual(entry.name, 'Dark Souls');
        assert.isTrue(entry.description.includes('Live Through A Million Deaths & Earn Your Legacy.'))
        assert.deepEqual(entry.playableOn, ['PC', 'PlayStation 3', 'Xbox 360', 'Xbox One']);
        assert.strictEqual(entry.imageUrl, 'https://howlongtobeat.com/gameimages/Dark_Souls_Cover_Art.jpg');
        assert.isTrue(entry.gameplayMain > 40);
        assert.isTrue(entry.gameplayCompletionist > 100);
      });
    });

    it('should fail to load entry for 123 (404)', () => {
      return assert.isRejected(new HowLongToBeatService().detail('123'));
    });
  });


  describe('Test for search()', () => {
    it('should have no search results when searching for dorks', () => {
      return new HowLongToBeatService().search('dorks', 1).then((result) => {
        assert.isNotNull(result);
        assert.strictEqual(result.length, 0);
      });
    });

    it('should have at least 3 search results when searching for dark souls III', () => {
      return new HowLongToBeatService().search('dark souls III', 1).then((result) => {
        assert.isNotNull(result);
        assert.isTrue(result.length > 3);
        assert.strictEqual(result[0].id, '26803');
        assert.strictEqual(result[0].name, 'Dark Souls III');
        assert.strictEqual(result[0].imageUrl, 'https://howlongtobeat.com/gameimages/Dark_souls_3_cover_art.jpg');
        assert.isTrue(result[0].gameplayMain > 30);
        assert.isTrue(result[0].gameplayCompletionist > 80);
      });
    });

    it('should have 1 search results with 100% similarity when searching for Persona 4: Golden', () => {
      return new HowLongToBeatService().search('Persona 4 Golden', 1).then((result) => {
        assert.isNotNull(result);
        assert.strictEqual(result.length, 1);
        //assert.strictEqual(result[0].similarity, 1);
      });
    });

    it('Entries without any time settings (e.g. "Surge") should have a zero hour result', () => {
      return new HowLongToBeatService().search('Surge', 1).then((result) => {
        console.log(result);
        assert.isNotNull(result);
        assert.isTrue(result.length > 1);
        assert.strictEqual(result[0].gameplayMain, 0);
      });
    });
  });


});
