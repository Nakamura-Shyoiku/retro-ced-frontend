/* eslint-disable no-undef,react/jsx-filename-extension */
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'raf/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import Raven from 'raven-js';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import createRavenMiddleware from 'raven-for-redux';
import rootReducer from './store';
import Routes from './routes';
import registerServiceWorker from './registerServiceWorker';
import ScrollToTop from './components/ScrollToTop';

Raven.config('https://9056e04ebc8d46d2bc7ab5172e48011c@sentry.io/534615').install();

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(
      thunk,
      createRavenMiddleware(Raven),
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  ),
);

ReactDOM.render(
  (
    <Provider store={store}>
      <HashRouter>
        <ScrollToTop>
          <Routes />
        </ScrollToTop>
      </HashRouter>
    </Provider>
  ),
  document.getElementById('root'),
);

registerServiceWorker();
