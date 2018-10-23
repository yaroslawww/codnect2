/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow, ipcMain } from 'electron';
import MenuBuilder from './menu';

const Store = require('./utils/class-store');
const HostsContainer = require('./utils/class-hosts-container');

// First instantiate the store class
const store = new Store({
  configName: 'codnect2_preferences',
  defaults: {
    // 800x600 is the default size of our window
    windowBounds: { width: 800, height: 600 }
  }
});

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  const { width, height } = store.get('windowBounds');

  mainWindow = new BrowserWindow({
    show: false,
    width,
    height
  });

  mainWindow.on('resize', () => {
    // The event doesn't pass us the window size, so we call the `getBounds` method which returns an object with
    // the height, width, and x and y coordinates.
    const { newWidth, newHeight } = mainWindow.getBounds();
    // Now that we have them, save them using the `set` method.
    store.set('windowBounds', { newWidth, newHeight });
  });


  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  // https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
});

ipcMain.on('configFile.selected', (event, ...args) => {
  /* eslint-disable */
  const configReader = require(`${__dirname}/utils/config-reader`);
  /* eslint-enables */
  configReader.read(args[0], (hostsContainer: HostsContainer) => {
    store.set('configFile.path', hostsContainer.filePath);
    event.sender.send('configFile.parsed', hostsContainer);
  });
});

ipcMain.on('configFile.needRemove', (event, ...args) => {
  store.set('configFile.path', undefined);
  event.sender.send('configFile.removed');
});

ipcMain.on('checkPreferences', (event, ...args) => {
  if (store.get('configFile.path') !== undefined) {
    /* eslint-disable */
    const configReader = require(`${__dirname}/utils/config-reader`);
    /* eslint-enables */
    configReader.read(store.get('configFile.path'), (hostsContainer: HostsContainer) => {
      event.sender.send('configFile.parsed', hostsContainer);
    });
  }
});
