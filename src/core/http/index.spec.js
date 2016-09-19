/* eslint-disable max-len */

import chai from 'chai';
import sinon from 'sinon';
import * as HttpModule from './index';

chai.should();

/**
 * @name http
 */
describe.only('http', () => {
  describe('http', () => {
    it('should perform a success GET request and return a promise resolved of response', sinon.test(function test() {
      const fetch = this.stub(global, 'fetch');
      const config = { endpoint: 'http://dev.com', method: 'GET' };

      fetch
        .withArgs('http://dev.com', {
          method: 'GET',
          headers: {},
        })
        .returns(Promise.resolve({ ok: true }));

      const expectation = { ok: true };

      return HttpModule.http(config).then(result => {
        result.should.deep.equal(expectation);
      });
    }));

    it('should perform a success GET request with custom headers return a promise resolved of response', sinon.test(function test() {
      const fetch = this.stub(global, 'fetch');
      const config = {
        endpoint: 'http://dev.com',
        method: 'GET',
        headers: { Authorization: 'Bearer TOKEN' },
      };

      fetch
        .withArgs('http://dev.com', {
          method: 'GET',
          headers: { Authorization: 'Bearer TOKEN' },
        })
        .returns(Promise.resolve({ ok: true }));

      const expectation = { ok: true };

      return HttpModule.http(config).then(result => {
        result.should.deep.equal(expectation);
      });
    }));

    it('should perform a failed GET request and return a promise rejected of response', sinon.test(function test() {
      const fetch = this.stub(global, 'fetch');
      const config = { endpoint: 'http://dev.com', method: 'GET' };

      fetch
        .withArgs('http://dev.com', {
          method: 'GET',
          headers: {},
        })
        .returns(Promise.resolve({ ok: false }));

      const expectation = { ok: false };

      return HttpModule.http(config).catch(result => {
        result.should.deep.equal(expectation);
      });
    }));

    it('should not perform a request and return a promise rejected of fetch error', sinon.test(function test() {
      const fetch = this.stub(global, 'fetch');
      const config = { endpoint: 'http://dev.com', method: 'GET' };

      fetch
        .withArgs('http://dev.com', {
          method: 'GET',
          headers: {},
        })
        .returns(Promise.reject({ fetch: 'error' }));

      const expectation = { fetch: 'error' };

      return HttpModule.http(config).catch(result => {
        result.should.deep.equal(expectation);
      });
    }));
  });
});
