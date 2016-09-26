import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import Topic from '../Topic';
import Topics from './index';

chai.should();

/**
 * @name Topics
 */
describe('<Topics />', () => {
  it('should render the component correctly with given props', () => {
    const size = 5;
    const topics = [
      { id: 1, title: 'Topic 1', slug: 'topic-1' },
      { id: 2, title: 'Topic 2', slug: 'topic-2' },
      { id: 3, title: 'Topic 3', slug: 'topic-3' },
    ];

    const expectation = (
      <div className="topics">
        <Topic key={1} topic={{ id: 1, title: 'Topic 1', slug: 'topic-1' }} />
        <Topic key={2} topic={{ id: 2, title: 'Topic 2', slug: 'topic-2' }} />
        <Topic key={3} topic={{ id: 3, title: 'Topic 3', slug: 'topic-3' }} />
      </div>
    );

    const wrapper = shallow(
      <Topics
        topics={topics}
        size={size}
      />
    );

    wrapper.containsMatchingElement(expectation).should.be.equal(true);
  });

  it('should render +N when topics length are greather than given size', () => {
    const size = 2;
    const topics = [
      { id: 1, title: 'Topic 1', slug: 'topic-1' },
      { id: 2, title: 'Topic 2', slug: 'topic-2' },
      { id: 3, title: 'Topic 3', slug: 'topic-3' },
    ];

    const expectation = (
      <div className="topics">
        <Topic key={1} topic={{ id: 1, title: 'Topic 1', slug: 'topic-1' }} />
        <Topic key={2} topic={{ id: 2, title: 'Topic 2', slug: 'topic-2' }} />
        <span className="topics__more">+{1}</span>
      </div>
    );

    const wrapper = shallow(
      <Topics
        topics={topics}
        size={size}
      />
    );

    wrapper.containsMatchingElement(expectation).should.be.equal(true);
  });
});
