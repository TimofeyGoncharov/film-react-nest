import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from '../repository/order.service';
import { GetOrder } from './dto/order.schema';

describe('Testing OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue({
        processOrder: jest.fn().mockResolvedValue({
          items: [
            {
              day: '29 июня',
              daytime: '2024-06-29T11:00:53+03:00',
              film: '92b8a2a7-ab6b-4fa9-915b-d27945865e39',
              price: 350,
              row: 1,
              seat: 4,
              session: '940e657a-69fa-4f71-a48e-3c064dcb61fd',
              time: '11:00',
            },
          ],
          total: 1,
        }),
      })
      .compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  it('Check function order', async () => {
    const orderData: GetOrder = {
      tickets: [
        {
          day: '29 июня',
          daytime: '2024-06-29T11:00:53+03:00',
          film: '92b8a2a7-ab6b-4fa9-915b-d27945865e39',
          price: 350,
          row: 1,
          seat: 4,
          session: '940e657a-69fa-4f71-a48e-3c064dcb61fd',
          time: '11:00',
        },
      ],
      email: 'timofigoncharov6112@mail.ru',
      phone: '+79999999999',
    };
    const orderComplete = await controller.create(orderData);
    const result = {
      items: orderData.tickets,
      total: orderData.tickets.length,
    };
    expect(service.processOrder).toHaveBeenCalledWith(orderData);
    expect(orderComplete).toEqual(result);
  });
});
