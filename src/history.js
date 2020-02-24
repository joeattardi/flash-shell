const readline = require('readline');

const state = require('./state');

let historyIndex;

exports.processHistoryUp = function processHistoryUp(input) {
  const history = state.getHistory();
  if (historyIndex === undefined) {
    historyIndex = history.length;
  }
  historyIndex = Math.max(0, historyIndex - 1);
  return processHistory(history[historyIndex], input);
};

exports.processHistoryDown = function processHistoryDown(input) {
  const history = state.getHistory();
  if (historyIndex === undefined) {
    historyIndex = history.length;
  }
  historyIndex = Math.min(history.length, historyIndex + 1);
  return processHistory(historyIndex === history.length ? '' : history[historyIndex], input);
};

function processHistory(historyCommand, input) {
  readline.moveCursor(process.stdout, input.length * -1, 0);
  readline.clearLine(process.stdout, 1);
  process.stdout.write(historyCommand);
  return historyCommand;
};