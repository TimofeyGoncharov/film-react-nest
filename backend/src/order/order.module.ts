import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from '../repository/order.service';
import { FilmsModule } from '../films/films.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from '../films/dto/films.schema';
import { Schedule } from '../films/dto/schedule.schema';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Schedule]), FilmsModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
