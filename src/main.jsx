import React from 'react';
import ReactDOM from 'react-dom';
import { StrictMode } from 'react';
import { App } from './App';
import { setAssetPath } from '@esri/calcite-components/dist/components';
setAssetPath('https://unpkg.com/@esri/calcite-components/dist/calcite/assets');
import './main.css';

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
