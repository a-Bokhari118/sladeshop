import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
//redux
import { Provider } from 'react-redux';
import store from './store';
//alert
import { positions, transitions, Provider as AlertProvider } from 'react-alert';
import AlretTemplate from 'react-alert-template-basic';

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};
ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlretTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>,
  document.getElementById('root')
);
