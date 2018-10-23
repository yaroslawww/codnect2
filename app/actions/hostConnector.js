// @flow
import { send } from 'redux-electron-ipc';
import type { Dispatch } from '../reducers/types';


const explorerDialog = require('electron').remote.dialog;

export const TAB_BASE = 'DASHBOARD';
export const TAB_FILE = 'CONFIG_FILE';
export const TAB_HOST = 'HOST_DATA';

export const UPDATE_HOSTS = 'UPDATE_HOSTS';
export const REMOVE_CONFIGFILE = 'REMOVE_CONFIGFILE';

export function selectConfigFile() {
  return (dispatch: Dispatch) => {
     const filePath = explorerDialog.showOpenDialog({ properties: ['openFile'], message: 'Please select config file' });
     if (filePath !== undefined && filePath[0] !== undefined) {
      dispatch(send('configFile.selected', filePath[0]));
     }
  };
}

export function removeConfigFile() {
  return (dispatch: Dispatch) => {
      dispatch(send('configFile.needRemove'));
  };
}

export function configFileParsed(event, ...args) {
  return {
    type: UPDATE_HOSTS,
    hosts: args[0]
  };
}

export function configFileRemoved() {
  return {
    type: REMOVE_CONFIGFILE,
  };
}

export function checkPreferences() {
  return (dispatch: Dispatch) => {
      dispatch(send('checkPreferences'));
  };
}
