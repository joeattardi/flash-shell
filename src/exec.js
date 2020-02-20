const fs = require('fs');
const { execSync } = require('child_process');
const { resolve } = require('path');

const state = require('./state');

exports.find = function find(command) {
  const path = state.getEnv('PATH').split(':');

  for (let i = 0; i < path.length; i++) {
    const fullPath = resolve(path[i], command);
    if (fs.existsSync(fullPath)) {
      return fullPath;
    }
  }

  return null;
};

exports.exec = function exec(workingDirectory, command, env) {
  try {
    execSync(command, {
      cwd: workingDirectory,
      stdio: 'inherit',
      env: {...process.env, ...env}
    });

    return 0;
  } catch (err) {
    return err.status;
  }
};
