import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import Spinner from './index';

chai.should();

/**
 * @name <Spinner />
 */
describe('<Spinner />', () => {
  it('should render component with defaul props', () => {
    const expectation = (
      <div className="spinner">
        <div className="spinner__bounce-1" />
        <div className="spinner__bounce-2" />
      </div>
    );

    const component = shallow(
      <Spinner />
    );

    component.containsMatchingElement(expectation).should.be.equal(true);
  });
});
