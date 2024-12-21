const winston = require("winston");

const DemoLogger = () => {
  const { combine, timestamp, prettyPrint, colorize, json } = winston.format;

  return winston.createLogger({
    level: 'debug',
    format: combine(
      timestamp(),
      prettyPrint()
    ),
    transports: [
      new winston.transports.File({
        filename: 'error.log',
        level: 'error',
        format: json() 
      }),
      new winston.transports.File({
        filename: 'combined.log',
        format: json() 
      }),
      // Console transport with colorized log level
      new winston.transports.Console({
        format: combine(
          colorize(),  // Apply colorize only for console output
          timestamp()
        )
      })
    ]
  });
};

module.exports = DemoLogger;
