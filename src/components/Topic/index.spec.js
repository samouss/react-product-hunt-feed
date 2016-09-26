import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import Topic from './index';

chai.should();

/**
 * @name Topic
 */
describe('<Topic />', () => {
  it('should render correctly with given props', () => {
    const topic = { id: 1, title: 'My topic', slug: 'my-topic' };

    const expectation = (
      <div className="topic">My topic</div>
    );

    const wrapper = shallow(
      <Topic
        topic={topic}
      />
    );

    wrapper.containsMatchingElement(expectation).should.be.equal(true);
  });
});
