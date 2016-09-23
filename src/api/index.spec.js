/* eslint-disable max-len */

import chai from 'chai';
import sinon from 'sinon';
import * as ApiModule from './index';
import * as HttpModule from '../core/http';
import * as ConfigModule from '../../config';

chai.should();

/**
 * @name api
 */
describe('api', () => {
  /**
   * @name getCategories
   */
  describe('getCategories', () => {
    it('should fetch the Product Hunt API and return a promise of categories', sinon.test(function test() {
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

      this.stub(ConfigModule.default, 'endpoint', 'http://product-hunt.dev');

      const expectation = {
        categories: [
          { id: 1, slug: 'tech' },
          { id: 2, slug: 'category-2' },
        ],
      };

      return ApiModule.getCategories().then(res => {
        res.should.be.deep.equal(expectation);
      });
    }));
  });

  /**
   * @name getPosts
   */
  describe('getPosts', () => {
    it('should fetch the Product Hunt API and return a promise of posts', sinon.test(function test() {
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

      this.stub(ConfigModule.default, 'endpoint', 'http://product-hunt.dev');

      const expectation = {
        posts: [
          { id: 1, name: 'Slack' },
          { id: 2, name: 'Apple Music' },
          { id: 3, name: 'Twitter' },
        ],
      };

      return ApiModule.getPosts().then(res => {
        res.should.be.deep.equal(expectation);
      });
    }));

    it('should fetch the Product Hunt API with query parameters and return a promise of posts', sinon.test(function test() {
      const params = {
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

      this.stub(ConfigModule.default, 'endpoint', 'http://product-hunt.dev');

      const expectation = {
        posts: [
          { id: 1, name: 'Slack' },
          { id: 2, name: 'Apple Music' },
          { id: 3, name: 'Twitter' },
          { id: 4, name: 'Spotify' },
          { id: 5, name: 'Uber' },
        ],
      };

      return ApiModule.getPosts(params).then(res => {
        res.should.be.deep.equal(expectation);
      });
    }));
  });

  /**
   * @name getJSONWithAuthorization
   */
  describe('getJSONWithAuthorization', () => {
    it('should fetch the Product Hunt API with Authorization header', sinon.test(function test() {
      const endpoint = 'http://product-hunt.dev';

      this.stub(HttpModule, 'getJSON')
        .withArgs('http://product-hunt.dev', {
          headers: {
            Authorization: 'Bearer TOKEN',
          },
        })
        .returns(Promise.resolve({
          ok: true,
        }));

      this.stub(ConfigModule.default, 'endpoint', 'http://product-hunt.dev');
      this.stub(ConfigModule.default, 'token', 'TOKEN');

      const expectation = {
        ok: true,
      };

      return ApiModule.getJSONWithAuthorization(endpoint).then(res => {
        res.should.be.deep.equal(expectation);
      });
    }));

    it('should fetch the Product Hunt API with Authorization header and extra headers', sinon.test(function test() {
      const endpoint = 'http://product-hunt.dev';
      const params = {
        'X-Custom-Header': 'custom value',
      };

      this.stub(HttpModule, 'getJSON')
        .withArgs('http://product-hunt.dev', {
          headers: {
            Authorization: 'Bearer TOKEN',
            'X-Custom-Header': 'custom value',
          },
        })
        .returns(Promise.resolve({
          ok: true,
        }));

      this.stub(ConfigModule.default, 'endpoint', 'http://product-hunt.dev');
      this.stub(ConfigModule.default, 'token', 'TOKEN');

      const expectation = {
        ok: true,
      };

      return ApiModule.getJSONWithAuthorization(endpoint, params).then(res => {
        res.should.be.deep.equal(expectation);
      });
    }));
  });
});
