// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import hostConnector from './hostConnector';

export default function createRootReducer(history: {}) {
  const routerReducer = connectRouter(history)(() => {});

  return connectRouter(history)(
    combineReducers({ router: routerReducer, hostConnector })
  );
}
