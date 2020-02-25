const os = require('os');

const state = require('../state');

exports.execute = function history() {
  state.getHistory().forEach((item, index) => {
    process.stdout.write(`${index}  ${item}`);
    process.stdout.write(os.EOL);
  })
};
