const fs = require('fs');
const os = require('os');
const path = require('path');

const state = require('../state');

let lastDirectory = state.getWorkingDirectory();

module.exports = function chdir(command, dir) {
  let actualDir = dir ? dir.replace(/~/g, os.homedir()) : os.homedir();
  if (dir === '-') {
    actualDir = lastDirectory;
  }

  const absolutePath = command[0] === '/' ? path.resolve(actualDir) : path.resolve(state.getWorkingDirectory(), actualDir);

  if (!fs.existsSync(absolutePath)) {
    process.stderr.write(`${command}: no such file or directory: ${dir}`);
    process.stderr.write(os.EOL);
    return 1;
  } else if (!fs.statSync(absolutePath).isDirectory()) {
    process.stderr.write(`${command}: not a directory: ${absolutePath}`);
    process.stderr.write(os.EOL);
    return 1;
  }

  lastDirectory = state.getWorkingDirectory();
  state.setWorkingDirectory(absolutePath);
  return 0;
};
