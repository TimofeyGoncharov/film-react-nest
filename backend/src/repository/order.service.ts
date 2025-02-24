import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film, FilmDocument } from '../films/dto/films.schema';
import { CreateOrder, ResultOrder } from '../order/dto/order.schema';
import { Schedule } from 'src/films/dto/schedule.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Film)
    private filmModel: Repository<FilmDocument>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  async bookSeats(
    filmId: string,
    sessionId: string,
    seats: string[],
  ): Promise<void> {
    const film = await this.filmModel.findOne({
      where: { id: filmId },
      relations: ['schedules'],
    });

    if (!film) {
      throw new NotFoundException('Фильм не найдены');
    }

    const schedule = film.schedules.find((s) => s.id === sessionId);

    if (!schedule) {
      throw new NotFoundException('Сеанс не найден');
    }

    const occupiedSeats = new Set(schedule.taken || []);

    for (const seat of seats) {
      if (occupiedSeats.has(seat)) {
        throw new BadRequestException(`Место ${seat} уже забронировано`);
      }
      occupiedSeats.add(seat);
    }

    schedule.taken = Array.from(occupiedSeats);

    await this.scheduleRepository.save(schedule);
  }

  async processOrder(order: CreateOrder): Promise<ResultOrder[]> {
    const result: ResultOrder[] = [];

    for (const ticket of order.tickets) {
      await this.bookSeats(ticket.film, ticket.session, [
        `${ticket.row}-${ticket.seat}`,
      ]);

      result.push({
        film: ticket.film,
        session: ticket.session,
        row: ticket.row,
        seat: ticket.seat,
        price: ticket.price,
        daytime: new Date().toISOString(),
      });
    }

    return result;
  }
}
