#!/usr/bin/env node

const os = require('os');
const path = require('path');
const readline = require('readline');

const chalk = require('chalk');

const builtins = require('./builtins');
const exec = require('./exec');
const init = require('./init');
const { parseCommand } = require('./parser');
const state = require('./state');

init();

const interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

updatePrompt(interface);
interface.prompt();

let input = '';

process.stdin.on('keypress', (chunk, key) => {
  if (key.name === 'return') {
    return;
  } else if (key.name === 'backspace') {
    input = input.slice(0, -1);
  } else if (!key.ctrl && !key.meta && chunk) {
    input += chunk;
  }

  const words = input.split(' ');
  if (exec.find(words[0]) || words[0] in builtins || state.getAlias(words[0])) {
    readline.moveCursor(process.stdout, input.length * -1, 0);
    process.stdout.write(chalk.green(words[0]) + input.slice(words[0].length));
  } else {
    readline.moveCursor(process.stdout, input.length * -1, 0);
    process.stdout.write(chalk.redBright(words[0]) + input.slice(words[0].length));
  }
});

interface.on('line', line => {
  let result = 0;
  input = '';
  if (line) {
    const {command, args, env} = parseCommand(line);
    if (!command) {
      Object.keys(env).forEach(key => state.setEnv(key, env[key]));
    } else if (command in builtins) {
      result = builtins[command](command, ...args);
    } else if (exec.find(command)) {
      result = exec.exec(state.getWorkingDirectory(), exec.find(command) + ' ' + args.join(' '), env);
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
