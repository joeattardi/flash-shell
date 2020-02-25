const builtins = require('./builtins');

const { parseCommand } = require('./parser');

module.exports = function complete(input) {
  const {command, args, env} = parseCommand(input);

  if (command in builtins && builtins[command].completer) {
    return builtins[command].completer(args);
  }
};
