import { registerAs } from '@nestjs/config';
import { config } from 'dotenv';

config({ path: process.env.ENV_PATH || '.env' });
export default registerAs('app', () => ({
  name: process.env.APP_NAME || 'NESTJS TEMPLATE',
  env: process.env.APP_ENV || 'local',
  debug: +process.env.APP_DEBUG || 1,
  url: process.env.APP_URL || 'localhost',
  port: +process.env.APP_PORT || 5000,
}));
