import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

const configTypeORM = {
  type: 'postgres',
  database: `${process.env.DB_NAME}`,
  host: `${process.env.DB_HOST}` || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: `${process.env.DB_USERNAME}` || 'postgres',
  password: `${process.env.DB_PASSWORD}`,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/**/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  dropSchema: process.env.DB_DROP === 'true', 
  synchronize: process.env.DB_SYNC === 'true',
  logging: process.env.DB_LOGGING === 'true',
};

export default registerAs('typeorm', () => configTypeORM);

export const connectionSource = new DataSource(configTypeORM as DataSourceOptions);
