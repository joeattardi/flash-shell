#!/usr/bin/env node

const os = require('os');
const path = require('path');
const readline = require('readline');

const chalk = require('chalk');

const builtins = require('./builtins');
const exec = require('./exec');
const { parseCommand } = require('./parser');
const state = require('./state');

const interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

updatePrompt(interface);
interface.prompt();

interface.on('line', input => {
  let result = 0;
  if (input) {
    const {command, args} = parseCommand(input);

    if (command === 'exit' || command === 'logout') {
      exit(0);
    } else if (command in builtins) {
      result = builtins[command](command, ...args);
    } else if (exec.find(command)) {
      result = exec.exec(state.getWorkingDirectory(), exec.find(command) + ' ' + args.join(' '));
    } else {
      process.stderr.write(`${command}: command not found`);
      process.stderr.write(os.EOL);
      result = 127;
    }
  }

  state.setEnv('?', result);

  updatePrompt(interface);
  interface.prompt();
});

function updatePrompt(interface) {
  const pathParts = state.getWorkingDirectory().split(path.sep);
  interface.setPrompt(`${chalk.cyanBright(pathParts[pathParts.length - 1])} ⚡️ $ `);
}

function exit(status) {
  process.exit(status);
}
