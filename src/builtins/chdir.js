const fs = require('fs');
const os = require('os');
const path = require('path');

const state = require('../state');
const util = require('../util');

let lastDirectory = state.getWorkingDirectory();

exports.execute = function chdir(command, dir) {
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

exports.completer = function completer([arg]) {
  const cwd = state.getWorkingDirectory();
  const entries = fs.readdirSync(cwd)
    .filter(path => path.startsWith(arg))
    .map(path => path.slice(arg.length));

  return util.findCommonRoot(entries);
};
