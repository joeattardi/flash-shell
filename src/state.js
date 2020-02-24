const fs = require('fs');
const os = require('os');
const path = require('path');

const SPECIAL_ENV = ['?'];

let cwd = path.resolve('.');

const env = {
  PATH: '/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin',
  NODE_VERSION: process.version,
  '?': 0
};

const aliases = {};

let history = [];

const HISTORY_FILE = path.resolve(os.homedir(), '.flashHistory.json');

exports.setWorkingDirectory = function setWorkingDirectory(dir) {
  cwd = dir;
};

exports.getWorkingDirectory = function getWorkingDirectory() {
  return cwd;
};

exports.setEnv = function setEnv(key, value) {
  env[key] = value;
};

exports.getEnv = function getEnv(key) {
  return env[key];
};

exports.getEnvKeys = function getEnvKeys() {
  return Object.keys(env).filter(key => !SPECIAL_ENV.includes(key));
};

exports.setAlias = function(alias, command) {
  aliases[alias] = command;
};

exports.getAlias = function(alias) {
  return aliases[alias];
};

exports.getHistory = function() {
  return history;
};

exports.addHistory = function(command) {
  if (command !== 'history' && command !== history[history.length - 1]) {
    history = [...history, command].slice(0, 5000);
  }
};

exports.saveHistory = function () {
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(history));
};

exports.loadHistory = function () {
  if (fs.existsSync(HISTORY_FILE)) {
    history = JSON.parse(fs.readFileSync(HISTORY_FILE, { encoding: 'utf8' }));
  } else {
    history = [];
  }
};
