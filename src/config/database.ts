import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config({ path: process.env.ENV_PATH || '.env' });

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_DATABASE || 'test',
  entities: ['dist/**/*.entity.{ts,js}'],
  migrations: ['dist/migrations/**/*.{ts,js}'],
  logging: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
