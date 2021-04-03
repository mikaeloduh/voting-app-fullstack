const dotenv = require('dotenv');
const http = require('http');

const app = require('./app');
const db = require('./models');
const { logger } = require('./core/logger');

dotenv.config({ verbose: true });

const PORT = process.env.PORT || 8081;

try {
  http.createServer(app)
    .listen(PORT)
    .on('listening', function() {
      const addr = this.address();
      logger.log(
        'info',
        `Server listening on port ${addr.port} in ${app.get('env')} environment`,
        { label: 'server' }
      );
    })
    .on('error', function(error) {
      if (error.syscall !== 'listen') {
        logger.log('error', error.stack, { label: 'server' });

        exitProcess(1);
      }

      // Handle specific listen errors with friendly messages
      switch (error.code) {
        case 'EACCES':
          logger.log('error', `Port ${error.port} requires elevated privileges`, { label: 'server' });
          exitProcess(1);
          break;
        case 'EADDRINUSE':
          logger.log('error', `Port ${error.port} is already in use`, { label: 'server' });
          exitProcess(1);
          break;
        case 'ECONNRESET':
          logger.log('error', error.stack, { label: 'server' });
          break;
        default:
          logger.log('error', error.stack, { label: 'server' });
      }
    })
    .on('clientError', function(error) {
      logger.log(
        'error',
        error.stack + `\nextra: {bytesParsed: ${error.bytesParsed}, rawPacket: ${error.rawPacket}}`,
        { label: 'server:clientError' }
      );
    });
} catch (error) {
  logger.log('error', error.stack, { label: 'process' });

  exitProcess(0);
}

/**
 * Process exit handler
 * @param {Number} code  exitCode
 */
 function exitProcess(code) {
  logger.log('error', 'Exiting server in 5 seconds...', { label: 'process' });

  setTimeout(() => process.exit(code), 5000);
}
