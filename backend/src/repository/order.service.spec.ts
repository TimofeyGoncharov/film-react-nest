import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { GetTicket } from '../order/dto/ticket.schema';
import { GetOrder } from 'src/order/dto/order.schema';

describe('OrderService', () => {
  let service: OrderService;

  const mockTickets: GetTicket[] = [
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
  ];

  const mockOrderData: GetOrder = {
    tickets: mockTickets,
    email: 'timofigoncharov6112@mail.ru',
    phone: '+79999999999',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<OrderService>(OrderService);
  });

  describe('.processOrder()', () => {
    it('Check processOrder', async () => {
      const result = await service.processOrder(mockOrderData);
      expect(result).toEqual({ items: mockTickets, total: 1 });
    });
  });
});
