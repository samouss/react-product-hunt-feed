import React, { PropTypes } from 'react';
import './index.css';

export default function Button({ onClick, children }) {
  return (
    <a
      href=""
      className="button"
      onClick={event => {
        event.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
