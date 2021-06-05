import morgan from 'morgan';
import Logger from './logger';

export const errorHandler = (error, request, response, next) => {
  Logger.error(error.message);

  switch (error.name) {
    case 'CastError':
      response.status(400).send({ error: 'malformated id' });
      break;
    case 'ValidationError':
      response.status(400).json({ error: error.message });
      break;
    case 'JsonWebTokenError':
      response.status(401).json({
        error: 'invalid token',
      });
      break;
    case 'TokenExpiredError':
      response.status(401).json({
        error: 'token expired',
      });
      break;
    default:
      next(error);
  }
};

const stream = {
  // Use the http severity
  write: (message) =>
    Logger.http(message.substring(0, message.lastIndexOf('\n'))),
};

// Skip all the Morgan http log if the application is not running in development mode.
const skip = () => {
  const env = process.env.NODE_ENV || 'development';
  return env !== 'development';
};

// Build the morgan middleware
export const morganMiddleware = morgan(
  // Define message format string (this is the default one).
  ':method :url :status :res[content-length] - :response-time ms',
  { stream, skip }
);
