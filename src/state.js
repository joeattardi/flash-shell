const path = require('path');

let cwd = path.resolve('.');

const env = {
  PATH: '/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin',
  NODE_VERSION: process.version,
  '?': 0
};

exports.setWorkingDirectory = function setWorkingDirectory(dir) {
  cwd = dir;
}

exports.getWorkingDirectory = function getWorkingDirectory() {
  return cwd;
}

exports.setEnv = function setEnv(key, value) {
  env[key] = value;
};

exports.getEnv = function getEnv(key) {
  return env[key];
}
