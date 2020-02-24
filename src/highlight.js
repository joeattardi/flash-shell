const readline = require('readline');

const chalk = require('chalk');

const builtins = require('./builtins');
const exec = require('./exec');
const state = require('./state');

module.exports = function highlight(input) {
  const words = input.split(/\s/);
  if (exec.find(words[0]) || words[0] in builtins || state.getAlias(words[0])) {
    readline.moveCursor(process.stdout, input.length * -1, 0);
    process.stdout.write(chalk.green(words[0]) + input.slice(words[0].length));
  } else {
    readline.moveCursor(process.stdout, input.length * -1, 0);
    process.stdout.write(chalk.redBright(words[0]) + input.slice(words[0].length));
  }
};
