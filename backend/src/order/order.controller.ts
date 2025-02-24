import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from '../repository/order.service';
import { CreateOrder } from './dto/order.schema';

@Controller('/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() createOrder: CreateOrder) {
    const items = await this.orderService.processOrder(createOrder);

    return {
      total: items.length,
      items,
    };
  }
}
