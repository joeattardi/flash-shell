const os = require('os');

const state = require('../state');

exports.execute = function echo(...command) {
  const result = command.slice(1)
    .map(arg => {
      if (arg[0] === '$') {
        return state.getEnv(arg.slice(1));
      }

      return arg;
    })
    .join(' ');

    process.stdout.write(result);
    process.stdout.write(os.EOL);

    return 0;
};
