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
    const command = parseCommand(input);
  
    if (command[0] in builtins) {
      result = builtins[command[0]](...command);
    } else if (exec.find(command[0])) {
      result = exec.exec(state.getWorkingDirectory(), exec.find(command[0]) + ' ' + [...command.slice(1)].join(' '));
    } else {
      process.stderr.write(`${command[0]}: command not found`);
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