import React, { Component, PropTypes } from 'react';
import last from 'lodash.last';
import InfiniteList from 'react-infinite-scroll-list';
import { fetchCategories, fetchPosts } from './api';
import { byId, getIds, post, category } from './state/normalize';
import { getPostsWithCategory } from './state/selectors';
import Spinner from './components/Spinner';
import Post from './components/Post';

/**
 * @name Container
 */
export default class Container extends Component {

  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      categoryById: {},
      postById: {},
      categoryIds: [],
      postIds: [],
    };

    this.perPage = 20;

    this.onVote = this.onVote.bind(this);
    this.onThresholdReach = this.onThresholdReach.bind(this);
  }

  /**
   * @name componentDidMount
   */
  componentDidMount() {
    const { endpoint, token } = this.props;
    const { categoryById, postById, categoryIds, postIds } = this.state;

    const headers = { Authorization: `Bearer ${token}` };
    const query = { per_page: this.perPage };

    return Promise.all([
      fetchCategories({ endpoint, headers }),
      fetchPosts({ endpoint, headers, query }),
    ]).then(([resCategories, resPosts]) => {
      const categories = resCategories.categories.map(category);
      const posts = resPosts.posts.map(post);

      this.setState({
        isLoading: false,
        categoryById: byId(categoryById, categories),
        postById: byId(postById, posts),
        categoryIds: getIds(categoryIds, categories),
        postIds: getIds(postIds, posts),
      });
    });
  }

  /**
   * @name onThresholdReach
   */
  onThresholdReach() {
    this.setState({ isLoading: true });

    const { endpoint, token } = this.props;
    const { postIds, postById } = this.state;

    const headers = { Authorization: `Bearer ${token}` };
    const query = { per_page: this.perPage, older: last(postIds) };

    return fetchPosts({ endpoint, headers, query }).then(res => {
      const posts = res.posts.map(post);

      this.setState({
        isLoading: false,
        postById: byId(postById, posts),
        postIds: getIds(postIds, posts),
      });
    });
  }

  /**
   * @name onVote
   */
  onVote(post) {
    console.warn(`
Can't call the Product Hunt API it's read-only
check this link for more information
https://api.producthunt.com/v1/docs
    `.trim());

    this.setState({
      postById: {
        ...this.state.postById,
        [post.id]: {
          ...post,
          votes: (post.isVoted) ? post.votes - 1 : post.votes + 1,
          isVoted: !post.isVoted,
        },
      },
    });
  }

  /**
   * @name renderFooter
   */
  renderFooter() {
    return (this.state.isLoading) ? <Spinner /> : null;
  }

  /**
   * @name render
   */
  render() {
    const postsWithCategory = getPostsWithCategory(this.state);

    return (
      <div className="container">
        <InfiniteList
          className="container--list"
          containerHeight="89vh"
          isLoading={this.state.isLoading}
          isEndReach={false}
          onThresholdReach={this.onThresholdReach}
          threshold={655}
        >
          {postsWithCategory.map(post => (
            <Post
              key={post.id}
              post={post}
              onClickVote={this.onVote}
            />
          ))}
          {this.renderFooter()}
        </InfiniteList>
      </div>
    );
  }

}

Container.propTypes = {
  endpoint: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};
