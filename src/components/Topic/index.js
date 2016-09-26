import React, { PropTypes } from 'react';
import './index.css';

export default function Topic({ topic }) {
  return (
    <div className="topic">{topic.title}</div>
  );
}

export const TopicTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
});

Topic.propTypes = {
  topic: TopicTypes.isRequired,
};
