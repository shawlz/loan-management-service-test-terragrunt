/**
 *  all your application settings go here.
 * usage: this.configService.get('settings.your_config_key')
 */
import { registerAs } from '@nestjs/config';
import { config } from 'dotenv';

config({ path: process.env.ENV_PATH || '.env' });

export default registerAs('settings', () => ({
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
  },
}));
