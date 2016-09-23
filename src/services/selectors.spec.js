import chai from 'chai';
import * as SeletorsModule from './selectors';

chai.should();

/**
 * @name selectors
 */
describe('selectors', () => {
  /**
   * @name getPost
   */
  describe('getPost', () => {
    it('should return post from state for a given id', () => {
      const state = { postById: { 1: { id: 1, title: 'Post 1' } } };
      const id = 1;

      const expectation = { id: 1, title: 'Post 1' };
      const result = SeletorsModule.getPost(state, id);

      result.should.be.deep.equal(expectation);
    });
  });

  /**
   * @name getCategory
   */
  describe('getCategory', () => {
    it('should return category from state for a given id', () => {
      const state = { categoryById: { 1: { id: 1, title: 'Category 1' } } };
      const id = 1;

      const expectation = { id: 1, title: 'Category 1' };
      const result = SeletorsModule.getCategory(state, id);

      result.should.be.deep.equal(expectation);
    });
  });

  /**
   * @name getPostWithCategory
   */
  describe('getPostWithCategory', () => {
    it('should return post with category from state for a given post', () => {
      const state = { categoryById: { 1: { id: 1, title: 'Category 1' } } };
      const post = { id: 1, categoryId: 1, title: 'Post 1' };

      const expectation = {
        id: 1,
        categoryId: 1,
        title: 'Post 1',
        category: { id: 1, title: 'Category 1' },
      };

      const result = SeletorsModule.getPostWithCategory(state, post);

      result.should.be.deep.equal(expectation);
    });
  });

  /**
   * @name getPostsWithCategory
   */
  describe('getPostsWithCategory', () => {
    it('should return posts with category from state', () => {
      const state = {
        postIds: [1, 2],
        postById: {
          1: { id: 1, categoryId: 1, title: 'Post 1' },
          2: { id: 2, categoryId: 2, title: 'Post 2' },
        },
        categoryById: {
          1: { id: 1, title: 'Category 1' },
          2: { id: 2, title: 'Category 2' },
        },
      };

      const expectation = [
        {
          id: 1,
          categoryId: 1,
          title: 'Post 1',
          category: { id: 1, title: 'Category 1' },
        },
        {
          id: 2,
          categoryId: 2,
          title: 'Post 2',
          category: { id: 2, title: 'Category 2' },
        },
      ];

      const result = SeletorsModule.getPostsWithCategory(state);

      result.should.be.deep.equal(expectation);
    });
  });
});
