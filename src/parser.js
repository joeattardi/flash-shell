exports.parseCommand = function parseCommand(line) {
  const argv = line.split(' ');

  let commandIndex = argv.findIndex(arg => !arg.includes('='));
  const command = commandIndex >= 0 ? argv[commandIndex] : null;
  const args = commandIndex >= 0 ? argv.slice(commandIndex + 1) : null;

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

  return {
    command,
    args,
    env
  };
};
