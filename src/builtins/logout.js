const state = require('../state');

module.exports = function logout() {
  state.saveHistory();
  process.exit(0);
};
