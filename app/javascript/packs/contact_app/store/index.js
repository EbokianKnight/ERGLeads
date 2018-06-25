import rootReducer from '../reducers/_rootReducer';
import thunk from 'redux-thunk';
import logger from '../middleware/logger';
import { applyMiddleware, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router'

const createApplicationStore = (history, initialState = {}) => {
  // Middleware

  let middlewares = [routerMiddleware(history), thunk];
  if (window.ERGBuild.env == "development") {
    middlewares.push(logger);
  }

  // Store Enhancers
  const enhancers = [];
  let composeEnhancers = compose;

  // Check for ChromeBrowser Dev Tools
  if (window.ERGBuild.env == "development") {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if (typeof devToolsExtension == 'function') {
      composeEnhancers = devToolsExtension;
    }
  }

  // Store
  return createStore(
    connectRouter(history)(rootReducer),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares), ...enhancers),
  );
}

export default createApplicationStore;
