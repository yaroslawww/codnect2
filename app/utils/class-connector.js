const childProcess = require('child_process');

class Connector {

    /**
     *
     * @param host
     * @param atPath
     */
    constructor(host, atPath = null) {
        this.defineTerminal();
        this._host = host;
        this._atPath = atPath;
    }

    get atPath() {
        return this._atPath;
    }

    set atPath(value) {
        this._atPath = value;
    }

    defineTerminal() {
        // for linux gnome
        this._terminal = 'gnome-terminal';
    }

    createCommand() {
        let command = 'ssh -o \'StrictHostKeyChecking no\' ' + this._host.sshUser + '@' + this._host.sshHost;
        if (this._host.sshPort) {
            command += ' -p ' + this._host.sshPort;
        }
        if (this._host.sshKey) {
            command += ' -i \'' + this._host.sshKey + '\'';
        } else if (this._host.sshPass) {
            command = 'sshpass -p\'' + this._host.sshPass + '\' ' + command;
        }
        if (this._host.sshDir) {
            command += ' -t \'cd ' + this._host.sshDir + '; bash\''
        }

        return command;
    }

    createExecution(command = null) {
        if (command == null) {
            command = this.createCommand();
        }
        switch (this._terminal) {
            case 'gnome-terminal':
                return 'gnome-terminal --tab --active -- bash -c "' + command + '"';
                break;
        }
    }

    runSsh() {
        let command = this.createExecution();
        console.log(command);
        let openTerminalAtPath = childProcess.exec(command);

        openTerminalAtPath.on('error', (err) => {
            console.log(err);
        });
    }

    print() {
        console.log('Connector host: ' + this._host.name);
    }
}

module.exports = Connector;
