const express = require('express');
const app = express();

const logging = require('./startup/logging');
logging.init();
const logger = logging.logger;

require('./startup/routes')(app);
require('./startup/db')();

require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
	logger.info(`Listening in port ${port}...`);
});

module.exports = server;