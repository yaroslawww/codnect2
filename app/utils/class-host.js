class Host {

    constructor(name) {
        this._name = name;
        this._sshHost = null;
        this._sshUser = null;
        this._sshPort = null;
        this._sshKey = null;
        this._sshPass = null;
        this._sshDir = null;
        this._additionalInfo = {};
    }

    createFromObject(object) {
      const self = this;
      Object.keys(object).forEach((key) => {
        self[key] = object[key];
      });

      return this;
    }


    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get sshHost() {
        return this._sshHost;
    }

    set sshHost(value) {
        this._sshHost = value;
    }

    get sshUser() {
        return this._sshUser;
    }

    set sshUser(value) {
        this._sshUser = value;
    }

    get sshPort() {
        return this._sshPort;
    }

    set sshPort(value) {
        this._sshPort = value;
    }

    get sshKey() {
        return this._sshKey;
    }

    set sshKey(value) {
        this._sshKey = value;
    }

    get sshPass() {
        return this._sshPass;
    }

    set sshPass(value) {
        this._sshPass = value;
    }

    get sshDir() {
        return this._sshDir;
    }

    set sshDir(value) {
        this._sshDir = value;
    }

    get additionalInfo() {
        return this._additionalInfo;
    }

    set additionalInfo(object) {
        if (typeof object === 'object' && object.constructor === Object) {
            this._additionalInfo = {};
        }
    }

    updateAdditionalInfo(object) {
        if (typeof object === 'object' && object.constructor === Object) {
            this._additionalInfo = Object.assign(this._additionalInfo, object);
        } else if(typeof object === 'object' && object.constructor === Array) {
            this._additionalInfo = Object.assign(this._additionalInfo, object[0]);
        }
    }

    removeAdditionalInfoByKeys(array) {
        if (typeof array === 'object' && array.constructor === Array) {
            const _self = this;
            array.forEach((value) => {
                if (_self._additionalInfo[value] === undefined) {
                    delete _self._additionalInfo[value];
                }
            })
        }
    }

    clearAdditionalInfo() {
        this._additionalInfo = {};
        return this;
    }

    print() {
        console.log(`Host: ${  this._name}`);
    }
}

module.exports = Host;
