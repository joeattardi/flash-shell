const os = require('os');

const state = require('../state');

exports.execute = function exportEnv(command, arg) {
  if (!arg) {
    state.getEnvKeys().forEach(key => {
      process.stdout.write(`${key}=${state.getEnv(key)}`);
      process.stdout.write(os.EOL);
    })
    return 0;
  }

  const index = arg.indexOf('=');
  const key = arg.slice(0, index);
  const value = arg.slice(index + 1);
  
  state.setEnv(key, value);
  return 0;
};
