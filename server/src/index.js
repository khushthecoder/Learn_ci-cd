require('dotenv').config();
const app = require('./app');
const { logger } = require('./utils/logger');

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  logger.info(`Veloura server listening on http://localhost:${PORT}`);
});

// minor update
