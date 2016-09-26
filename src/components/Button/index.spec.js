import chai from 'chai';
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import Button from './index';

chai.should();

/**
 * @name Button
 */
describe('<Button />', () => {
  it('should render correctly with given props', () => {
    const expectation = (
      <a
        href=""
        className="button"
      >
        With content
      </a>
    );

    const wrapper = shallow(
      <Button
        onClick={() => {}}
      >
        With content
      </Button>
    );

    wrapper.containsMatchingElement(expectation).should.be.equal(true);
  });

  it('should call the callback on click and stop the event', () => {
    const event = { preventDefault: sinon.spy() };
    const onClick = sinon.spy();

    const wrapper = shallow(
      <Button
        onClick={onClick}
      >
        With content
      </Button>
    );

    wrapper
      .find('a')
      .simulate('click', event);

    onClick.calledOnce.should.be.equal(true);
    event.preventDefault.calledOnce.should.be.equal(true);
  });
});
