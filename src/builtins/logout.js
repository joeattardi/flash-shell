const state = require('../state');

exports.execute = function logout() {
  state.saveHistory();
  process.exit(0);
};
