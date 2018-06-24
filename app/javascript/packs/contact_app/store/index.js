import rootReducer from '../reducers/_rootReducer';
import thunk from 'redux-thunk';
import logger from '../middleware/logger';
import { applyMiddleware, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router'

const createApplicationStore = (history, initialState = {}) => {
  console.log('window', window.ERGBuild)
  // Middleware
  let middlewares = [history, thunk];
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
    composeEnhancers(applyMiddleware(routerMiddleware(...middlewares), ...enhancers)),
  );
}

export default createApplicationStore;
