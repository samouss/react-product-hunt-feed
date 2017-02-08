import chai from 'chai';
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import Thumbnail from '../Thumbnail';
import Button from '../Button';
import Topics from '../Topics';
import Post from './index';

chai.should();

/**
 * @name Post
 */
describe('<Post />', () => {
  it('should render correctly with given props', sinon.test(function test() {
    this.stub(console, 'error');

    const onClickVote = () => {};
    const post = {
      title: 'Title of post',
      description: 'Description of post',
      thumbnail: 'http://static.dev/thumbnail',
      topics: [{ id: 1, title: 'Topic 1', slug: 'topic-1' }],
      votes: 5,
      isVoted: false,
    };

    const expectation = (
      <div className="post">
        <div className="post__thumbnail">
          <Thumbnail
            source="http://static.dev/thumbnail"
            title="Title of post"
            width={80}
            height={80}
          />
        </div>
        <div className="post__content">
          <p className="post__content__title">Title of post</p>
          <p className="post__content__description">Description of post</p>
          <div className="post__content__meta">
            <Button
              selected={false}
            >
              <span>&#9650;</span>{5}
            </Button>

            <Topics
              topics={[{ id: 1, title: 'Topic 1', slug: 'topic-1' }]}
              size={3}
            />
          </div>
        </div>
      </div>
    );

    const wrapper = shallow(
      <Post
        post={post}
        onClickVote={onClickVote}
      />,
    );

    wrapper.containsMatchingElement(expectation).should.be.equal(true);
  }));
});
