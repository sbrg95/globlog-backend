import mongoose from 'mongoose';
import config from '../config';
import Logger from './logger';

const connect = (url = config.dbUrl, opts = {}) =>
  mongoose
    .connect(url, {
      ...opts,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => {
      Logger.debug('Database connected.');
    })
    .catch((err) => {
      Logger.error(`Database connection failled: ${err}`);
    });

export default connect;
