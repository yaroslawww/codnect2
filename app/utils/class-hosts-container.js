const path = require('path');
const Host = require(`${__dirname  }/class-host`);

class HostsContainer {

  constructor(filePath) {
    this.filePath = filePath;
    this.fileDir = path.dirname(filePath);
    this.fileName = path.basename(filePath);
    this.hosts = {};
    this._currentHost = null;
  }

  openHost(name) {
    this._currentHost = new Host(name);
  }

  closeHost() {
    if (this._currentHost !== null) {
      this.hosts[this._currentHost.name] = this._currentHost;
      this._currentHost = null;
    }
  }

  setToCurrentHost(propertyName, propertyValue) {
    if (this._currentHost !== null) {
      this._currentHost[propertyName] = propertyValue;
    }
  }

  executeToCurrentHost(methodName, ...value) {
    if (this._currentHost !== null) {
      this._currentHost[methodName](value);
    }
  }

  print() {
    const length = Object.keys(this.hosts).length;
    // console.log(`Hosts counts: ${  length}`);
    if (length > 0) {
      console.log(this.hosts[Object.keys(this.hosts)[0]]);
    }
  }
}

module.exports = HostsContainer;
