// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from '../reducers';
import ipcMiddleware from './middlewares/ipsMiddleware'
import type { appStateType } from '../reducers/types';

const history = createHashHistory();
const rootReducer = createRootReducer(history);

// Redux Configuration
const middleware = [];
const enhancers = [];

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Options: http://extension.remotedev.io/docs/API/Arguments.html
  })
  : compose;
/* eslint-enable no-underscore-dangle */

// Router Middleware
const router = routerMiddleware(history);
middleware.push(router);

// Thunk Middleware
middleware.push(thunk);

// IPC connection
middleware.push(ipcMiddleware);

// Apply Middleware & Compose Enhancers
enhancers.push(applyMiddleware(...middleware));
const enhancer = composeEnhancers(...enhancers);

function configureStore(initialState?: appStateType) {
  return createStore(rootReducer, initialState, enhancer);
}

export default { configureStore, history };
