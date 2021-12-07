import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './assets/fonts/Roboto-Regular.ttf';
import './assets/fonts/Quando-Regular.ttf';
// REDUX
import { Provider } from 'react-redux';
import store from './redux/store.ts';

ReactDOM.render(
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>,
  document.getElementById('root'),
);
