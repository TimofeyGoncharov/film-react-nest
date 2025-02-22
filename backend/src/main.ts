import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfig } from './app.config.provider';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: AppConfig = app.get('CONFIG');
  const port = configService.port;
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  await app.listen(port);
}
bootstrap();
