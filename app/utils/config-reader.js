const fs = require('fs');
const readline = require('readline');
const HostsContainer = require('./class-hosts-container');

const read = (filePath, cb) => {

  /* fs.readFile(filePath, 'utf8', function(err, contents) {
      console.log(contents);
  }); */


  const instream = fs.createReadStream(filePath);
  const outstream = new (require('stream'))();
  const reader = readline.createInterface(instream, outstream);

  const hostsContainer = new HostsContainer(filePath);

  reader.on('line', (line) => {
    // console.log(line);
    let found;
    if ((found = /^\s*#!\s.*/gi.exec(line)) !== null) {
      // nothing to do. #! - used like comment
    } else if ((found = /^\s*$/gi.exec(line)) !== null) {
      hostsContainer.closeHost();
    } else if ((found = /^\sHost\s*/gi.exec(line)) !== null) {
      hostsContainer.closeHost();
    } else if (found = getRegEx(1, 'Host').exec(line)) {
      hostsContainer.closeHost();
      if (found[1] !== undefined) {
        hostsContainer.openHost(found[1]);
      }
    } else if (found = getRegEx(1, 'HostName').exec(line)) {
      if (found[1] !== undefined) {
        hostsContainer.setToCurrentHost('sshHost', found[1]);
      }
    } else if (found = getRegEx(1, 'User').exec(line)) {
      if (found[1] !== undefined) {
        hostsContainer.setToCurrentHost('sshUser', found[1]);
      }
    } else if (found = getRegEx(1, 'Port').exec(line)) {
      if (found[1] !== undefined) {
        hostsContainer.setToCurrentHost('sshPort', found[1]);
      }
    } else if (found = getRegEx(1, 'IdentityFile').exec(line)) {
      if (found[1] !== undefined) {
        hostsContainer.setToCurrentHost('sshKey', found[1]);
      }
    } else if (found = getRegEx(2, 'Pass').exec(line)) {
      if (found[1] !== undefined) {
        hostsContainer.setToCurrentHost('sshPass', found[1]);
      }
    } else if (found = getRegEx(2, 'SshDir').exec(line)) {
      if (found[1] !== undefined) {
        hostsContainer.setToCurrentHost('sshDir', found[1]);
      }
    } else if (found = /^[\s#]+([\S]*)\s+([\S]*)/gi.exec(line)) {
      if (found[1] !== undefined && found[2] !== undefined) {
        hostsContainer.executeToCurrentHost('updateAdditionalInfo', { [found[1]]: found[2] });
      }
    }
  });

  reader.on('close', () => {
    hostsContainer.closeHost();
    if (cb !== undefined) {
      cb(hostsContainer);
    }
  });
};

let getRegEx = (type, data) => {
  /*
  * types:
  * 1 = standard selector "key value"
  * 2 = angeco.net selector "# key value" //works like comments for standard ssh config file
  * */
  switch (type) {
    case 1:
      return new RegExp(`^\\s*${  data  }\\s+([\\S]*)`, 'gi');
    case 2:
      return new RegExp(`^[#\\s]+${  data  }\\s+([\\S]*)`, 'gi');
    default:
      break;
  }
};

module.exports = {
  read,
  getRegEx
};
