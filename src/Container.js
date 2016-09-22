import React, { Component } from 'react';
import { getCategories, getPosts } from './services/api';
import { normalizePost } from './services/posts';

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
      categories: [],
      posts: [],
    };
  }

  /**
   * @name componentDidMount
   */
  componentDidMount() {
    Promise.all([
      getCategories(),
      getPosts({ query: { per_page: 10 } }),
    ]).then(([res1, res2]) => {
      this.setState({
        isLoading: false,
        categories: this.state.categories.concat(res1.categories),
        posts: this.state.posts.concat(res2.posts.map(normalizePost)),
      });
    });
  }

  /**
   * @name render
   */
  render() {
    const { isLoading, posts } = this.state;

    if (isLoading) {
      return (
        <div className="container">
          <h1>Product Hunt</h1>

          <p>Loading....</p>
        </div>
      );
    }

    return (
      <div className="container">
        <h1>Product Hunt</h1>

        {posts.map(post => (
          <div key={post.id}>{post.title}</div>
        ))}
      </div>
    );
  }

}
