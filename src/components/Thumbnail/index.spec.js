import chai from 'chai';
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import * as HttpModule from '../../core/http';
import Thumbnail from './index';

chai.should();

/**
 * @name Thumbnail
 */
describe('<Thumbnail />', () => {
  it('should render correctly with given props', sinon.test(function test() {
    const applyQueryParameters = this.stub(HttpModule, 'applyQueryParameters');
    const source = 'http://static.dev';
    const width = 40;
    const height = 50;

    applyQueryParameters
      .withArgs('http://static.dev', { w: 40, h: 50 })
      .returns('http://static.dev?w=40&h=50');

    const expectation = (
      <img
        src="http://static.dev?w=40&h=50"
        role="presentation"
      />
    );

    const wrapper = shallow(
      <Thumbnail
        source={source}
        width={width}
        height={height}
      />
    );

    wrapper.containsMatchingElement(expectation).should.be.equal(true);
  }));
});
