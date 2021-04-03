const dotenv = require('dotenv');

const app = require('./app');
const db = require('./models');

dotenv.config({ verbose: true });

const PORT = process.env.PORT || 8081;

app.listen(PORT, function() {
  logger.log('info', `Server is starting on port ${PORT}`, { label: 'server' });
});

