const readline = require('readline');

const builtins = require('./builtins');
const complete = require('./completion');
const highlight = require('./highlight');
const history = require('./history');
const suggest = require('./suggest');

let input = '';

module.exports = function init(rlInterface, getPrompt) {
  rlInterface.on('line', () => {
    input = '';
  });

  process.stdin.on('keypress', (chunk, key) => {
    if (key.name === 'd' && key.ctrl) {
      builtins.logout.execute();
    } else if (key.name === 'tab') {
      const completion = complete(input);
      if (completion) {
        readline.cursorTo(process.stdout, 0);
        readline.clearLine(process.stdout, 1);
        input = input + completion;
        process.stdout.write(getPrompt());
        process.stdout.write(input);
      }
    } else if (key.name === 'up') {
      input = history.processHistoryUp(input);
    } else if (key.name === 'down') {
      input = history.processHistoryDown(input);
    } else if (key.name === 'right') {
      input = suggest.completeSuggestion(input);
    } else if (key.name === 'return') {
      return;
    } else if (key.name === 'backspace') {
      input = input.slice(0, -1);
      if (input) {
        suggest.suggest(input);
      }
    } else if (!key.ctrl && !key.meta && chunk) {
      input += chunk;
      suggest.suggest(input);
    }

    highlight(input);

    rlInterface.line = input;
    rlInterface.cursor = input.length;
  });
};
