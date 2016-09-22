import chai from 'chai';
import * as PostsModule from './posts';

chai.should();

/**
 * @name posts
 */
describe('posts', () => {
  /**
   * @name normalizePost
   */
  describe('normalizePost', () => {
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
          image_url: 'http://producthunt/thumbnail',
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
      };

      const result = PostsModule.normalizePost(post);

      result.should.be.deep.equal(expectation);
    });
  });

  /**
   * @name normalizeTopic
   */
  describe('normalizeTopic', () => {
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

      const result = PostsModule.normalizeTopic(post);

      result.should.be.deep.equal(expectation);
    });
  });
});
