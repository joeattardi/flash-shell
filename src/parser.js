exports.parseCommand = function parseCommand(line) {
  const argv = line.split(' ');

  const commandIndex = Math.max(0, argv.findIndex(arg => arg.includes('=')));

  return {
    command: argv[commandIndex],
    args: argv.slice(1)
  };
};
