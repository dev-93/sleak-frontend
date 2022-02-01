import * as React from 'react';
import { render } from 'react-dom';
import App from '@layouts/App/Index';
import { BrowserRouter } from 'react-router-dom';

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.querySelector('#app'),
);
