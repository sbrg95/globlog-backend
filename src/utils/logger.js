import { createLogger, format, transports, addColors } from 'winston';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  const env = process.env.NODE_ENV || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'warn';
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

addColors(colors);

const myFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

const myTransports = [
  new transports.File({
    filename: 'logs/error.log',
    level: 'error',
  }),
  new transports.File({ filename: 'logs/all.log' }),
];

const Logger = createLogger({
  level: level(),
  levels,
  format: myFormat,
  transports: myTransports,
});

if (process.env.NODE_ENV !== 'production') {
  Logger.add(
    new transports.Console({
      format: format.combine(
        format.colorize({
          all: true,
        })
      ),
    })
  );
}

export default Logger;
