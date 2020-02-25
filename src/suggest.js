const readline = require('readline');

const chalk = require('chalk');

const history = require('./history');

exports.suggest = function suggest(input) {
  const matchingHistory = history.findMatchingHistory(input);
  if (matchingHistory) {
    const suggestion = matchingHistory.slice(input.length);
    readline.clearLine(process.stdout, 1);
    process.stdout.write(chalk.gray(suggestion));
    readline.moveCursor(process.stdout, suggestion.length * -1, 0);
  } else {
    readline.clearLine(process.stdout, 1);
  }
};

exports.completeSuggestion = function completeSuggestion(input) {
  const matchingHistory = history.findMatchingHistory(input);
  if (matchingHistory) {
    const completion = matchingHistory.slice(input.length);
    process.stdout.write(completion);
  }

  return matchingHistory;
};
