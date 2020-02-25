const builtins = require('./builtins');
const highlight = require('./highlight');
const history = require('./history');
const suggest = require('./suggest');

let input = '';

module.exports = function init(interface) {
  process.stdin.on('keypress', (chunk, key) => {
    if (key.name === 'd' && key.ctrl) {
      builtins.logout();
    } else if (key.name === 'up') {
      input = interface.line = history.processHistoryUp(input);
      highlight(input);
    } else if (key.name === 'down') {
      input = interface.line = history.processHistoryDown(input);
      highlight(input);
    } else if (key.name === 'right') {
      input = suggest.completeSuggestion(input);
      highlight(input);
    } else if (key.name === 'return') {
      return;
    } else if (key.name === 'backspace') {
      input = input.slice(0, -1);
      highlight(input);
      if (input) {
        suggest.suggest(input);
      }
    } else if (!key.ctrl && !key.meta && chunk && key.name !== 'tab') {
      input += chunk;
      highlight(input);
      suggest.suggest(input);
    }
  });
};
