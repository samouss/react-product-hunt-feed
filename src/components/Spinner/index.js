import React from 'react';
import './index.css';

export default function Spinner() {
  return (
    <div className="spinner">
      <div className="spinner__bounce-1" />
      <div className="spinner__bounce-2" />
    </div>
  );
}
