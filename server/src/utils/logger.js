const levels = { info: '\x1b[36m', warn: '\x1b[33m', error: '\x1b[31m', debug: '\x1b[90m' };
const reset = '\x1b[0m';

function log(level, ...args) {
  const color = levels[level] || '';
  const ts = new Date().toISOString();
  console.log(`${color}[${ts}] ${level.toUpperCase()}${reset}`, ...args);
}

const logger = {
  info: (...args) => log('info', ...args),
  warn: (...args) => log('warn', ...args),
  error: (...args) => log('error', ...args),
  debug: (...args) => process.env.NODE_ENV === 'development' && log('debug', ...args),
};

module.exports = { logger };

// minor update
