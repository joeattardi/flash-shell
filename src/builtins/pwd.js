const os = require('os');

const state = require('../state');

module.exports = function pwd() {
  process.stdout.write(state.getWorkingDirectory());
  process.stdout.write(os.EOL);

  return 0;
};
