import React, { PropTypes } from 'react';
import { applyQueryParameters } from '../../core/http';

export default function Thumbnail({ source, title, width, height }) {
  return (
    <img
      src={applyQueryParameters(source, { w: width, h: height })}
      alt={title}
    />
  );
}

Thumbnail.propTypes = {
  source: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};
