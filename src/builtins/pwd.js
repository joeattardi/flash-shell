const os = require('os');

const state = require('../state');

exports.execute = function pwd() {
  process.stdout.write(state.getWorkingDirectory());
  process.stdout.write(os.EOL);

  return 0;
};
