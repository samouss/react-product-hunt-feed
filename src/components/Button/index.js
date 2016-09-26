import React, { PropTypes } from 'react';
import './index.css';

export default function Button({ onClick, selected, children }) {
  return (
    <a
      href=""
      className={`button ${selected ? 'button--selected' : ''}`.trim()}
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
  selected: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};
