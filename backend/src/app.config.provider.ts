import { ConfigModule } from '@nestjs/config';

export const applicationConfig = process.env;

export const configProvider = {
  imports: [ConfigModule.forRoot()],
  provide: 'CONFIG',
  useValue: <AppConfig>{
    options: {
      driver: applicationConfig.DATABASE_DRIVER,
      url: applicationConfig.DATABASE_URL,
    },
    mode: process.env.MODE,
    logger: process.env.LOGGER,
  },
};

export interface AppConfig {
  options: AppConfigDatabase;
  mode: string;
  logger: string;
}

export interface AppConfigDatabase {
  driver: string;
  url: string;
}
