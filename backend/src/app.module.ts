import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'node:path';
import { DatabaseModule } from './database.module';
import { FilmsModule } from './films/dto/films.module';
import { OrderModule } from './order/dto/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', '..', 'public', 'content', 'afisha'),
      serveRoot: '/content/afisha/',
    }),
    DatabaseModule,
    FilmsModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
