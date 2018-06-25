import React from 'react';
import ReactDOM from 'react-dom';
import Router from './routes';
import createStore from './store'
import { Provider } from 'react-redux'

import { createBrowserHistory } from 'history'
const history = createBrowserHistory();

document.addEventListener('DOMContentLoaded', () => {
  const initialState = window.ERGBuild && window.ERGBuild.initialState || {}
  ReactDOM.render(
    <Provider store={createStore(history, initialState)}>
      <Router history={history} />
    </Provider>,
    document.getElementById('contact_app'),
  )
});
