const express = require('express');
const app = express();

const logging = require('./startup/logging');
logging.init();
const logger = logging.logger;

require('./startup/routes')(app);
require('./startup/db')();

require('./startup/config')();
require('./startup/validation')();

const port = process.env.PORT || 3000;
app.listen(port, () => {
	logger.info(`Listening in port ${port}...`);
});