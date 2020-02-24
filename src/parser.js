const state = require('./state');

exports.parseCommand = function parseCommand(line) {
  const argv = line.split(' ');

  let commandIndex = argv.findIndex(arg => !arg.includes('='));
  let command = commandIndex >= 0 ? argv[commandIndex] : null;
  let args = commandIndex >= 0 ? argv.slice(commandIndex + 1) : null;

  if (commandIndex === -1) {
    commandIndex = argv.length;
  }

  const env = argv.slice(0, commandIndex).reduce((previous, arg) => {
    const index = arg.indexOf('=');
    const key = arg.slice(0, index);
    const value = arg.slice(index + 1);
    previous[key] = value;
    return previous;
  }, {});

  const alias = state.getAlias(command);
  if (alias) {
    const aliasParts = alias.split(/\s/);
    command = aliasParts[0];
    args = [...aliasParts.slice(1), ...args];
  }

  return {
    command,
    args,
    env
  };
};
