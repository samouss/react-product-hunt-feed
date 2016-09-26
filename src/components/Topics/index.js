import React, { PropTypes } from 'react';
import Topic, { TopicTypes } from '../Topic';
import './index.css';

export default function Topics({ topics, size }) {
  const displays = topics.slice(0, size);
  const number = topics.length - displays.length;
  const element = <span className="topics__more">+{number}</span>;

  return (
    <div className="topics">
      {displays.map(topic => (
        <Topic
          key={topic.id}
          topic={topic}
        />
      ))}
      {!!number && element}
    </div>
  );
}

Topics.propTypes = {
  topics: PropTypes.arrayOf(TopicTypes.isRequired).isRequired,
  size: PropTypes.number.isRequired,
};
