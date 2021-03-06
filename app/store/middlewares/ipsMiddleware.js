import createIpc from "redux-electron-ipc";
import * as hostConnectorActions from '../../actions/hostConnector';

const ipcMiddleware = createIpc({
  'configFile.parsed': hostConnectorActions.configFileParsed, // receive a message
  'configFile.removed': hostConnectorActions.configFileRemoved, // receive a message
});

module.exports = ipcMiddleware;
