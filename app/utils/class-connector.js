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
    let command = `ssh -o 'StrictHostKeyChecking no' ${  this._host.sshUser  }@${  this._host.sshHost}`;
    if (this._host.sshPort) {
      command += ` -p ${  this._host.sshPort}`;
    }
    if (this._host.sshKey) {
      // simple add key not works for me because I use usb device with ntfs system so I will use hack
      // command += ` -i '${  this._host.sshKey  }'`;
      const cpFilePath = '~/.ssh/tmp_key_codnect2';
      command = `cp ${  this._host.sshKey} ${  cpFilePath}; chmod 400 ${  cpFilePath}; ssh-add ${  cpFilePath}; rm -f ${  cpFilePath}; ${  command}`;
      if(this._atPath !== null) {
        command = `cd ${ this._atPath}; ${  command}`;
      }
    } else if (this._host.sshPass) {
      command = `sshpass -p'${  this._host.sshPass  }' ${  command}`;
    }
    if (this._host.sshDir) {
      command += ` -t 'cd ${  this._host.sshDir  }; bash'`;
    }

    command = `(${  command  }); bash;`;

    // command = '(cp /media/yaroslawww/YARO_PORT/portable/ssh/ws/path-app.pem ~/.ssh/ln_test; chmod 400 ~/.ssh/ln_test; ssh-add ~/.ssh/ln_test; rm -f ~/.ssh/ln_test; ssh -o \'StrictHostKeyChecking no\' ubuntu@pathmap.ca -p 22); bash;';

    return command;
  }

  createExecution(command = null) {
    if (command == null) {
      command = this.createCommand();
    }
    switch (this._terminal) {
      case 'gnome-terminal':
        return `gnome-terminal --tab --active -- bash -c "${  command  }"`;
        break;
    }
  }

  runSsh() {
    const command = this.createExecution();
    console.log(command);
    const openTerminalAtPath = childProcess.exec(command);

    openTerminalAtPath.on('error', (err) => {
      console.log(err);
    });
  }

  print() {
    console.log(`Connector host: ${  this._host.name}`);
  }
}

module.exports = Connector;
