import chai from 'chai';
import sinon from 'sinon';
import React from 'react';
import { shallow } from 'enzyme';
import InfiniteList from 'react-infinite-scroll-list';
import Spinner from './components/Spinner';
import Container from './Container';

const should = chai.should();

/**
 * @name <Container />
 */
describe('<Container />', () => {
  it('should render correctly', sinon.test(function test() {
    this.stub(console, 'error');

    const expectation = (
      <div className="container">
        <InfiniteList
          className="container--list"
          containerHeight="89vh"
          isLoading
          isEndReach={false}
          threshold={655}
        >
          <Spinner />
        </InfiniteList>
      </div>
    );

    const wrapper = shallow(
      <Container />
    );

    wrapper.containsMatchingElement(expectation).should.be.equal(true);
  }));

  it('should render correctly after mounted');
  it('should render correctly after onThresholdReach');

  /**
   * @name onVote
   */
  describe('onVote', () => {
    it('should increment the vote property when isVoted is false', sinon.test(function test() {
      this.stub(console, 'warn');

      const post = { id: 1, votes: 1, isVoted: false };
      const postById = {
        1: { id: 1, votes: 1, isVoted: false },
        2: { id: 2, votes: 1, isVoted: false },
      };

      const wrapper = shallow(
        <Container />
      );

      wrapper.setState({ postById });

      wrapper.instance().onVote(post);

      wrapper.state().postById[1].votes.should.be.equal(2);
      wrapper.state().postById[1].isVoted.should.be.equal(true);
    }));

    it('should decrement the vote property when isVoted is true', sinon.test(function test() {
      this.stub(console, 'warn');

      const post = { id: 1, votes: 2, isVoted: true };
      const postById = {
        1: { id: 1, votes: 2, isVoted: true },
        2: { id: 2, votes: 1, isVoted: false },
      };

      const wrapper = shallow(
        <Container />
      );

      wrapper.setState({ postById });

      wrapper.instance().onVote(post);

      wrapper.state().postById[1].votes.should.be.equal(1);
      wrapper.state().postById[1].isVoted.should.be.equal(false);
    }));
  });

  /**
   * @name renderFooter
   */
  describe('renderFooter', () => {
    it('should return the <Spinner /> when loading is true', () => {
      const wrapper = shallow(
        <Container />
      );

      wrapper.setState({ isLoading: true });

      const expectation = <Spinner />;
      const result = wrapper.instance().renderFooter();

      result.should.be.deep.equal(expectation);
    });

    it('should return null when loading is false', () => {
      const wrapper = shallow(
        <Container />
      );

      wrapper.setState({ isLoading: false });

      const result = wrapper.instance().renderFooter();

      should.not.exist(result);
    });
  });
});
