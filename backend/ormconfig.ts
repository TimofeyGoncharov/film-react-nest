import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'student',
  password: 'student',
  database: 'films',
  entities: ['src/**/**/**.schema{.ts,.js}'],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
  subscribers: ['src/subscriber/**/*{.ts,.js}'],
});
