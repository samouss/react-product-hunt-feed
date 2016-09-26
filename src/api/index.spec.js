/* eslint-disable max-len */

import chai from 'chai';
import sinon from 'sinon';
import * as ApiModule from './index';
import * as HttpModule from '../core/http';

chai.should();

/**
 * @name api
 */
describe('api', () => {
  /**
   * @name fetchCategories
   */
  describe('fetchCategories', () => {
    it('should fetch the Product Hunt API and return a promise of categories', sinon.test(function test() {
      const endpoint = 'http://product-hunt.dev';

      this.stub(HttpModule, 'getJSON')
        .withArgs('http://product-hunt.dev/categories')
        .returns(Promise.resolve({
          key: 'FETCH.SUCCESS',
          body: {
            categories: [
              { id: 1, slug: 'tech' },
              { id: 2, slug: 'category-2' },
            ],
          },
        }));

      const expectation = {
        categories: [
          { id: 1, slug: 'tech' },
          { id: 2, slug: 'category-2' },
        ],
      };

      return ApiModule.fetchCategories({ endpoint }).then(res => {
        res.should.be.deep.equal(expectation);
      });
    }));
  });

  /**
   * @name fetchPosts
   */
  describe('fetchPosts', () => {
    it('should fetch the Product Hunt API and return a promise of posts', sinon.test(function test() {
      const endpoint = 'http://product-hunt.dev';

      this.stub(HttpModule, 'getJSON')
        .withArgs('http://product-hunt.dev/posts/all')
        .returns(Promise.resolve({
          key: 'FETCH.SUCCESS',
          body: {
            posts: [
              { id: 1, name: 'Slack' },
              { id: 2, name: 'Apple Music' },
              { id: 3, name: 'Twitter' },
            ],
          },
        }));

      const expectation = {
        posts: [
          { id: 1, name: 'Slack' },
          { id: 2, name: 'Apple Music' },
          { id: 3, name: 'Twitter' },
        ],
      };

      return ApiModule.fetchPosts({ endpoint }).then(res => {
        res.should.be.deep.equal(expectation);
      });
    }));

    it('should fetch the Product Hunt API with query parameters and return a promise of posts', sinon.test(function test() {
      const params = {
        endpoint: 'http://product-hunt.dev',
        query: {
          per_page: 5,
          older: 0,
        },
      };

      this.stub(HttpModule, 'getJSON')
        .withArgs(`http://product-hunt.dev/posts/all?${encodeURI('per_page=5&older=0')}`)
        .returns(Promise.resolve({
          key: 'FETCH.SUCCESS',
          body: {
            posts: [
              { id: 1, name: 'Slack' },
              { id: 2, name: 'Apple Music' },
              { id: 3, name: 'Twitter' },
              { id: 4, name: 'Spotify' },
              { id: 5, name: 'Uber' },
            ],
          },
        }));

      const expectation = {
        posts: [
          { id: 1, name: 'Slack' },
          { id: 2, name: 'Apple Music' },
          { id: 3, name: 'Twitter' },
          { id: 4, name: 'Spotify' },
          { id: 5, name: 'Uber' },
        ],
      };

      return ApiModule.fetchPosts(params).then(res => {
        res.should.be.deep.equal(expectation);
      });
    }));
  });
});
