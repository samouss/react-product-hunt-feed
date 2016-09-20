/* eslint-disable max-len */

import chai from 'chai';
import sinon from 'sinon';
import * as HttpModule from './index';

chai.should();

/**
 * @name http
 */
describe('http', () => {
  /**
   * @name http
   */
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
        result.should.be.deep.equal(expectation);
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
        result.should.be.deep.equal(expectation);
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

      return HttpModule.http(config).then(result => {
        result.should.be.deep.equal(expectation);
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
        .returns(Promise.reject({ value: 'error' }));

      const expectation = {
        key: 'FETCH.ABORT',
        error: { value: 'error' },
      };

      return HttpModule.http(config).catch(result => {
        result.should.be.deep.equal(expectation);
      });
    }));
  });

  /**
   * @name getJSON
   */
  describe('getJSON', () => {
    it('should perform a success GET request and return a promise of json', sinon.test(function test() {
      const fetch = this.stub(global, 'fetch');
      const endpoint = 'http://dev.com';

      fetch
        .withArgs('http://dev.com', {
          method: 'GET',
          headers: {},
        })
        .returns(Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            message: 'success',
          }),
        }));

      const expectation = {
        key: 'FETCH.SUCCESS',
        body: { message: 'success' },
        response: { ok: true },
      };

      return HttpModule.getJSON(endpoint).then(res => {
        // @HACK: avoid to do this when chai support deep equal with function
        /* eslint-disable no-param-reassign */
        delete res.response.json;
        /* eslint-enable no-param-reassign */

        res.key.should.be.equal(expectation.key);
        res.body.should.be.deep.equal(expectation.body);
        res.response.should.be.deep.equal(expectation.response);
      });
    }));

    it('should perform a success GET request with custom header and return a promise of json', sinon.test(function test() {
      const fetch = this.stub(global, 'fetch');
      const endpoint = 'http://dev.com';
      const params = { headers: { Authorization: 'Bearer TOKEN' } };

      fetch
        .withArgs('http://dev.com', {
          method: 'GET',
          headers: {
            Authorization: 'Bearer TOKEN',
          },
        })
        .returns(Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            message: 'success',
          }),
        }));

      const expectation = {
        key: 'FETCH.SUCCESS',
        body: { message: 'success' },
        response: { ok: true },
      };

      return HttpModule.getJSON(endpoint, params).then(res => {
        // @HACK: avoid to do this when chai support deep equal with function
        /* eslint-disable no-param-reassign */
        delete res.response.json;
        /* eslint-enable no-param-reassign */

        res.key.should.be.equal(expectation.key);
        res.body.should.be.deep.equal(expectation.body);
        res.response.should.be.deep.equal(expectation.response);
      });
    }));

    it('should perform a failed GET request and return a promise of json', sinon.test(function test() {
      const fetch = this.stub(global, 'fetch');
      const endpoint = 'http://dev.com';

      fetch
        .withArgs('http://dev.com', {
          method: 'GET',
          headers: {},
        })
        .returns(Promise.resolve({
          ok: false,
          json: () => Promise.resolve({
            message: 'failed',
          }),
        }));

      const expectation = {
        key: 'FETCH.FAILED',
        body: { message: 'failed' },
        response: { ok: false },
      };

      return HttpModule.getJSON(endpoint).catch(res => {
        // @HACK: avoid to do this when chai support deep equal with function
        /* eslint-disable no-param-reassign */
        delete res.response.json;
        /* eslint-enable no-param-reassign */

        res.key.should.be.equal(expectation.key);
        res.body.should.be.deep.equal(expectation.body);
        res.response.should.be.deep.equal(expectation.response);
      });
    }));

    it('should always perform a GET request even if method is pass through param configuration', sinon.test(function test() {
      const fetch = this.stub(global, 'fetch');
      const endpoint = 'http://dev.com';
      const params = { method: 'POST' };

      fetch
        .withArgs('http://dev.com', {
          method: 'GET',
          headers: {},
        })
        .returns(Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            message: 'success',
          }),
        }));

      const expectation = {
        key: 'FETCH.SUCCESS',
        body: { message: 'success' },
        response: { ok: true },
      };

      return HttpModule.getJSON(endpoint, params).catch(res => {
        // @HACK: avoid to do this when chai support deep equal with function
        /* eslint-disable no-param-reassign */
        delete res.response.json;
        /* eslint-enable no-param-reassign */

        res.key.should.be.equal(expectation.key);
        res.body.should.be.deep.equal(expectation.body);
        res.response.should.be.deep.equal(expectation.response);
      });
    }));

    it('should not perform a request and return a promise rejected of fetch error', sinon.test(function test() {
      const fetch = this.stub(global, 'fetch');
      const endpoint = 'http://dev.com';
      const params = { method: 'POST' };

      fetch
        .withArgs('http://dev.com', {
          method: 'GET',
          headers: {},
        })
        .returns(Promise.reject({
          value: 'error',
        }));

      const expectation = {
        key: 'FETCH.ABORT',
        error: { value: 'error' },
      };

      return HttpModule.getJSON(endpoint, params).catch(result => {
        result.should.be.deep.equal(expectation);
      });
    }));
  });

  /**
   * @name responseJSON
   */
  describe('responseJSON', () => {
    it('should return a resolve promise of JSON when response is success', () => {
      const response = { ok: true, json: () => Promise.resolve({ message: 'success' }) };

      const expectation = {
        key: 'FETCH.SUCCESS',
        body: { message: 'success' },
        response: { ok: true },
      };

      return HttpModule.responseJSON(response).then(res => {
        // @HACK: avoid to do this when chai support deep equal with function
        /* eslint-disable no-param-reassign */
        delete res.response.json;
        /* eslint-enable no-param-reassign */

        res.key.should.be.equal(expectation.key);
        res.body.should.be.deep.equal(expectation.body);
        res.response.should.be.deep.equal(expectation.response);
      });
    });

    it('should return a reject promise of JSON when response is failed', () => {
      const response = { ok: false, json: () => Promise.resolve({ message: 'failed' }) };

      const expectation = {
        key: 'FETCH.FAILED',
        body: { message: 'failed' },
        response: { ok: false },
      };

      return HttpModule.responseJSON(response).catch(res => {
        // @HACK: avoid to do this when chai support deep equal with function
        /* eslint-disable no-param-reassign */
        delete res.response.json;
        /* eslint-enable no-param-reassign */

        res.key.should.be.equal(expectation.key);
        res.body.should.be.deep.equal(expectation.body);
        res.response.should.be.deep.equal(expectation.response);
      });
    });

    it('should return a reject promise when JSON is invalid', () => {
      const response = { ok: false, json: () => Promise.reject({ message: 'invalid' }) };

      const expectation = {
        key: 'FETCH.PARSE',
        error: { message: 'invalid' },
      };

      return HttpModule.responseJSON(response).catch(res => {
        res.should.be.deep.equal(expectation);
      });
    });
  });

  /**
   * @name parseJSON
   */
  describe('parseJSON', () => {
    it('should return a resolve promise of JSON when JSON is valid', () => {
      const response = { json: () => Promise.resolve({ message: 'valid' }) };

      const expectation = {
        message: 'valid',
      };

      return HttpModule.parseJSON(response).then(json => {
        json.should.be.deep.equal(expectation);
      });
    });

    it('should return a reject promise of JSON when JSON is invalid', () => {
      const response = { json: () => Promise.reject({ message: 'invalid' }) };

      const expectation = {
        key: 'FETCH.PARSE',
        error: {
          message: 'invalid',
        },
      };

      return HttpModule.parseJSON(response).catch(json => {
        json.should.be.deep.equal(expectation);
      });
    });
  });
});
