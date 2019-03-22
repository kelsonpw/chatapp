import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';

render(
  // render app in strictmode.  no errors should be present.
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
