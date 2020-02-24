const os = require('os');

const state = require('../state');

module.exports = function history() {
  state.getHistory().forEach((item, index) => {
    process.stdout.write(`${index}  ${item}`);
    process.stdout.write(os.EOL);
  })
};
