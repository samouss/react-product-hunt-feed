import React from 'react';
import ReactDOM from 'react-dom';
import Container from './Container';
import * as config from '../config.json';
import './index.css';

ReactDOM.render(
  <Container {...config} />,
  document.getElementById('root')
);
