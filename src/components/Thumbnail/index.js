import React, { PropTypes } from 'react';
import { applyQueryParameters } from '../../core/http';

export default function Thumbnail({ source, width, height }) {
  return (
    <img
      src={applyQueryParameters(source, { w: width, h: height })}
      role="presentation"
    />
  );
}

Thumbnail.propTypes = {
  source: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};
