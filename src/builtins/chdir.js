const fs = require('fs');
const os = require('os');
const path = require('path');

const state = require('../state');

module.exports = function chdir(command, dir) {
  actualDir = dir ? dir.replace(/~/g, os.homedir()) : os.homedir();

  const absolutePath = command[0] === '/' ? path.resolve(actualDir) : path.resolve(state.getWorkingDirectory(), actualDir);

  if (fs.existsSync(absolutePath)) {
    state.setWorkingDirectory(absolutePath);
    return 0;
  }

  process.stderr.write(`${command}: no such file or directory: ${dir}`);
  process.stderr.write(os.EOL);
  return 1;
};
