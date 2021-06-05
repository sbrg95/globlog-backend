import devConfig from './devConfig';
import testConfig from './testConfig';
import { merge } from '../utils/functions';

const env = process.env.NODE_ENV || 'development';

const baseConfig = {
  env,
  isDev: env === 'development',
  isTest: env === 'testing',
  port: process.env.PORT || 3000,
  secrets: {
    jwt: process.env.JWT_SECRET,
    jwtExp: '100d',
  },
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
  dbUrl: process.env.DB_URL,
};

let envConfig = {};

switch (env) {
  case 'dev':
  case 'development':
    envConfig = devConfig;
    break;
  case 'test':
  case 'testing':
    envConfig = testConfig;
    break;
  default:
    envConfig = devConfig;
}

export default merge(baseConfig, envConfig);
