import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, FilmDocument } from '../../films/dto/films.schema';
import { CreateOrder } from './order.schema';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}

  async bookSeats(
    filmId: string,
    sessionId: string,
    seats: string[],
  ): Promise<void> {
    const film = await this.filmModel
      .findOne({
        id: filmId,
        'schedule.id': sessionId,
      })
      .exec();

    if (!film) {
      throw new NotFoundException('Фильм или расписание не найдены');
    }

    const schedule = film.schedule.find((s) => s.id === sessionId);

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

    await this.filmModel.updateOne(
      { id: filmId, 'schedule.id': sessionId },
      { $set: { 'schedule.$.taken': schedule.taken } },
    );
  }

  async processOrder(order: CreateOrder): Promise<any[]> {
    const results = [];

    for (const ticket of order.tickets) {
      await this.bookSeats(ticket.film, ticket.session, [
        `${ticket.row}-${ticket.seat}`,
      ]);

      results.push({
        film: ticket.film,
        session: ticket.session,
        row: ticket.row,
        seat: ticket.seat,
        price: ticket.price,
        daytime: new Date().toISOString(),
      });
    }

    return results;
  }
}
