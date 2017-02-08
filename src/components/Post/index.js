import React, { PropTypes } from 'react';
import { TopicTypes } from '../Topic';
import Thumbnail from '../Thumbnail';
import Button from '../Button';
import Topics from '../Topics';
import './index.css';

export default function Post({ post, onClickVote }) {
  return (
    <div className="post">
      <div className="post__thumbnail">
        <Thumbnail
          source={post.thumbnail}
          title={post.title}
          width={80}
          height={80}
        />
      </div>
      <div className="post__content">
        <p className="post__content__title">{post.title}</p>
        <p className="post__content__description">{post.description}</p>
        <div className="post__content__meta">
          <Button
            onClick={() => onClickVote(post)}
            selected={post.isVoted}
          >
            <span>&#9650;</span>{post.votes}
          </Button>

          <Topics
            topics={post.topics}
            size={3}
          />
        </div>
      </div>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
    topics: PropTypes.arrayOf(TopicTypes.isRequired).isRequired,
    isVoted: PropTypes.bool.isRequired,
  }).isRequired,
  onClickVote: PropTypes.func.isRequired,
};
