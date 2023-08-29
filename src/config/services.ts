/**
 * all third-party services' configurations to go here
 * e.g AWS, METAMAP etc.
 * usage: this.configService.get('services.your_config_key')
 */
import { registerAs } from '@nestjs/config';
import { config } from 'dotenv';

config({ path: process.env.ENV_PATH || '.env' });

export default registerAs('services', () => ({}));
