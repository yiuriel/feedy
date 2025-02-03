import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'db/feedy.sqlite',
  entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
  synchronize: process.env.NODE_ENV !== 'production', // Disable in production
  logging: process.env.NODE_ENV !== 'production',
};
