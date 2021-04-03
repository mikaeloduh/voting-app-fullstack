const { createLogger, transports, format } = require('winston');

const devConfig = {
  level: 'debug',
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.printf(({ level, message, label = 'no category', timestamp }) => {
      return `${timestamp} [${label}] ${level}: ${message}`;
    })
  ),
  defaultMeta: { service: 'voting-app-service-dev' },
  transports: [
    // - Transports colorized logs to the console
    new transports.Console({
      consoleWarnLevels: ['warn'],
      stderrLevels: ['error']
    })
  ]
};

const productionConfig = {
  level: 'verbose',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.printf(({ level, message, label = 'no category', timestamp }) => {
      return `${timestamp} [${label}] ${level}: ${message.replace(/(?<="(password|token)":")[^"]+/gi, '**********')}`;
    })
  ),
  defaultMeta: { service: 'voting-app-service' },
  transports: [
    // - Transports plain text logs to the console
    new transports.Console({
      consoleWarnLevels: ['warn'],
      stderrLevels: ['error']
    })
  ]
};

/**
 * Create Logging function
 * @returns {object} Logger instance
 *
 * @method:
 * Logger.log(level, message, ...meta)
 *   level: Level of the logging message. [ error | warn | info | http | verbose | debug | silly ]
 *   message: Descriptive message being logged.
 *   meta: {
 *     label: API type
 *   }
 */
 const logger = (() => {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test')
    return createLogger(devConfig);

  return createLogger(productionConfig);
})();

module.exports = { logger };
