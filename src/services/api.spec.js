import chai from 'chai';
import sinon from 'sinon';
import * as ApiModule from './api';
import * as HttpModule from '../core/http';
import * as ConfigModule from '../../config';

chai.should();

describe('api', () => {
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
