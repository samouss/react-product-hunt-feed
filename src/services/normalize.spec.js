import chai from 'chai';
import * as NormalizeModule from './normalize';

chai.should();

/**
 * @name normalize
 */
describe('normalize', () => {
  /**
   * @name byId
   */
  describe('byId', () => {
    it('should return the given state with id as key and value as item from an array of items', () => {
      const state = {};
      const items = [
        { id: 1, title: 'Title 1' },
        { id: 2, title: 'Title 2' },
        { id: 3, title: 'Title 3' },
      ];

      const expectation = {
        1: { id: 1, title: 'Title 1' },
        2: { id: 2, title: 'Title 2' },
        3: { id: 3, title: 'Title 3' },
      };

      const result = NormalizeModule.byId(state, items);

      result.should.be.deep.equal(expectation);
    });

    it('should return the given state merge with id as key and value as item from an array of items', () => {
      const state = {
        1: { id: 1, title: 'Title 1' },
        2: { id: 2, title: 'Title 2' },
        3: { id: 3, title: 'Title 3' },
      };

      const items = [
        { id: 4, title: 'Title 4' },
        { id: 5, title: 'Title 5' },
        { id: 6, title: 'Title 6' },
      ];

      const expectation = {
        1: { id: 1, title: 'Title 1' },
        2: { id: 2, title: 'Title 2' },
        3: { id: 3, title: 'Title 3' },
        4: { id: 4, title: 'Title 4' },
        5: { id: 5, title: 'Title 5' },
        6: { id: 6, title: 'Title 6' },
      };

      const result = NormalizeModule.byId(state, items);

      result.should.be.deep.equal(expectation);
    });
  });

  /**
   * @name getIds
   */
  describe('getIds', () => {
    it('should return the given state with id as key and value as item from an array of items', () => {
      const state = [];
      const items = [
        { id: 1, title: 'Title 1' },
        { id: 2, title: 'Title 2' },
        { id: 3, title: 'Title 3' },
      ];

      const expectation = [1, 2, 3];
      const result = NormalizeModule.getIds(state, items);

      result.should.be.deep.equal(expectation);
    });

    it('should return the given state merge with id as key and value as item from an array of items', () => {
      const state = [1, 2, 3];
      const items = [
        { id: 4, title: 'Title 4' },
        { id: 5, title: 'Title 5' },
        { id: 6, title: 'Title 6' },
      ];

      const expectation = [1, 2, 3, 4, 5, 6];
      const result = NormalizeModule.getIds(state, items);

      result.should.be.deep.equal(expectation);
    });
  });
});
