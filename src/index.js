#!/usr/bin/env node

const os = require('os');
const path = require('path');
const readline = require('readline');

const chalk = require('chalk');

const init = require('./init');
const builtins = require('./builtins');
const exec = require('./exec');
const input = require('./input');
const { parseCommand } = require('./parser');
const state = require('./state');

init();

const rlInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  historySize: 0
});

updatePrompt(rlInterface);
rlInterface.prompt();

input(rlInterface, getPrompt);

rlInterface.on('line', line => {
  let result = 0;
  if (line) {
    const {command, args, env} = parseCommand(line);
    if (!command) {
      Object.keys(env).forEach(key => state.setEnv(key, env[key]));
    } else if (command in builtins) {
      result = builtins[command].execute(command, ...args);
    } else if (exec.find(command)) {
      result = exec.exec(state.getWorkingDirectory(), exec.find(command) + ' ' + args.join(' '), env);
    } else {
      process.stderr.write(`${command}: command not found`);
      process.stderr.write(os.EOL);
      result = 127;
    }

    state.addHistory(line);
    historyIndex = state.getHistory().length;
  }

  state.setEnv('?', result);

  updatePrompt(rlInterface);
  rlInterface.prompt();
});

function updatePrompt(rlInterface) {
  rlInterface.setPrompt(getPrompt());
}

function getPrompt() {
  const pathParts = state.getWorkingDirectory().split(path.sep);
  return `${chalk.cyanBright(pathParts[pathParts.length - 1])} ⚡️ $ `;
}
