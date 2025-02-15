import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'feedy',
  password: process.env.DB_PASSWORD || 'feedy123',
  database: process.env.DB_DATABASE || 'feedy',
  entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
  synchronize: process.env.NODE_ENV !== 'production', // Disable in production
  // dropSchema: process.env.NODE_ENV !== 'production', // Disable in production
  // logging: process.env.NODE_ENV !== 'production' ? 'all' : false,
};
