import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { DevLogger } from './logger/dev.logger';
import { JsonLogger } from './logger/json.logger';
import { TSKVLogger } from './logger/tskv.logger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
  app.useLogger(
    app.get('CONFIG').mode === 'dev'
      ? new DevLogger()
      : app.get('CONFIG').mode === 'prod' && app.get('CONFIG').logger === 'json'
        ? new JsonLogger()
        : new TSKVLogger(),
  );
}
bootstrap();
