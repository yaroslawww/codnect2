// @flow
import { send } from 'redux-electron-ipc';
import type { Dispatch } from '../reducers/types';


const explorerDialog = require('electron').remote.dialog;

export const UPDATE_HOSTS = 'UPDATE_HOSTS';

export function selectConfigFile() {
  return (dispatch: Dispatch) => {
     const filePath = explorerDialog.showOpenDialog({ properties: ['openFile'], message: 'Please select config file' });
     if (filePath !== undefined && filePath[0] !== undefined) {
      dispatch(send('configFile.selected', filePath[0]));
     }
  };
}

export function configFileParsed(event, ...args) {
  return {
    type: UPDATE_HOSTS,
    hosts: args[0]
  };
}

export function checkPreferences() {
  return (dispatch: Dispatch) => {
      dispatch(send('checkPreferences'));
  };
}
