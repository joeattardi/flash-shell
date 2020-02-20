const state = require('../state');

module.exports = function exportEnv(command, arg) {
  const index = arg.indexOf('=');
  const key = arg.slice(0, index);
  const value = arg.slice(index + 1);
  
  state.setEnv(key, value);
  return 0;
};
