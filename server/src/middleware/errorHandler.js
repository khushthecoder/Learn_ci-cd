const { logger } = require('../utils/logger');

function notFound(req, res, next) {
  res.status(404).json({ error: 'Not Found', path: req.originalUrl });
}

function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  logger.error(`${req.method} ${req.originalUrl} → ${status}`, err.message);
  res.status(status).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}

module.exports = { notFound, errorHandler };

// minor update

// minor update
