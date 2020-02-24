const fs = require('fs');
const os = require('os');
const path = require('path');

const state = require('./state');

const INIT_FILE = path.resolve(os.homedir(), '.flashrc.json');

module.exports = function init() {
  if (fs.existsSync(INIT_FILE)) {
    try {
      const init = JSON.parse(fs.readFileSync(INIT_FILE, { encoding: 'utf8' }));
      
      if (init.alias) {
        Object.keys(init.alias).forEach(alias => {
          state.setAlias(alias, init.alias[alias]);
        });
      }
    } catch (err) {
      process.stderr.write(`Failed to read init file ${INIT_FILE}: ${err.message}`);
      process.stderr.write(os.EOL);
    }
  }
};
