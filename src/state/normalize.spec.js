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

  /**
   * @name post
   */
  describe('post', () => {
    it('should return a post normalized from API object', () => {
      const post = {
        id: 76884,
        category_id: 1,
        name: 'Moojis',
        tagline: 'Changing the face of Emojis',
        created_at: '2016-09-22T04:59:49.893-07:00',
        discussion_url: 'http://producthunt/discussion',
        votes_count: 1,
        topics: [
          { id: 8, name: 'iPhone', slug: 'iphone' },
          { id: 351, name: 'iMessage Apps', slug: 'imessage-apps' },
          { id: 45, name: 'Emoji', slug: 'emoji' },
        ],
        thumbnail: {
          id: 255139,
          media_type: 'image',
          image_url: 'http://producthunt/thumbnail?h=10&w=10',
          metadata: {},
        },
      };

      const expectation = {
        id: 76884,
        categoryId: 1,
        title: 'Moojis',
        description: 'Changing the face of Emojis',
        createdAt: '2016-09-22T04:59:49.893-07:00',
        link: 'http://producthunt/discussion',
        votes: 1,
        topics: [
          { id: 8, title: 'iPhone', slug: 'iphone' },
          { id: 351, title: 'iMessage Apps', slug: 'imessage-apps' },
          { id: 45, title: 'Emoji', slug: 'emoji' },
        ],
        thumbnail: 'http://producthunt/thumbnail',
        isVoted: false,
      };

      const result = NormalizeModule.post(post);

      result.should.be.deep.equal(expectation);
    });
  });

  /**
   * @name topic
   */
  describe('topic', () => {
    it('should return a topic normalized from API object', () => {
      const post = {
        id: 8,
        name: 'iPhone',
        slug: 'iphone',
      };

      const expectation = {
        id: 8,
        title: 'iPhone',
        slug: 'iphone',
      };

      const result = NormalizeModule.topic(post);

      result.should.be.deep.equal(expectation);
    });
  });

  /**
   * @name category
   */
  describe('category', () => {
    it('should return a category normalized from API object', () => {
      const post = {
        id: 1,
        slug: 'tech',
        name: 'Tech',
        item_name: 'product',
        color: '#5898f1',
      };

      const expectation = {
        id: 1,
        title: 'Tech',
        color: '#5898f1',
      };

      const result = NormalizeModule.category(post);

      result.should.be.deep.equal(expectation);
    });
  });
});
