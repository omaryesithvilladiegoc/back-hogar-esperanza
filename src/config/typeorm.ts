import { registerAs } from '@nestjs/config';
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
  INTERNAL_URL_DATABASE,
} from 'src/helpers/enviroment';
import { DataSourceOptions, DataSource } from 'typeorm';

const isProduction = process.env.NODE_ENV === 'production';
const useDatabaseUrl = Boolean(INTERNAL_URL_DATABASE);

const config: DataSourceOptions = {
  type: 'postgres',
  url: useDatabaseUrl ? INTERNAL_URL_DATABASE : undefined,
  database: useDatabaseUrl ? undefined : DB_NAME,
  host: useDatabaseUrl ? undefined : DB_HOST,
  port: useDatabaseUrl ? undefined : Number(DB_PORT),
  username: useDatabaseUrl ? undefined : DB_USERNAME,
  password: useDatabaseUrl ? undefined : String(DB_PASSWORD),
  entities: ['dist/**/*.entity{.js,.ts}'],
  migrations: ['dist/migrations/*{.js,.ts}'],
  logging: !isProduction,
  synchronize: !isProduction,
  dropSchema: false,
  extra:
    isProduction && useDatabaseUrl
      ? {
          ssl: {
            rejectUnauthorized: false,
          },
        }
      : undefined,
};

export default registerAs('typeorm', () => config);

export const connectionSource = new DataSource(config);
