/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import HostConnectorPage from './containers/HostConnectorPage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.HOST_CONNECTOR} component={HostConnectorPage} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
