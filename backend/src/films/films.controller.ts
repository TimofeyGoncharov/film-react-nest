import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { FilmsService } from '../repository/films.service';
import { Film } from './dto/films.schema';
import { Schedule } from './dto/schedule.schema';

@Controller('/films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async findAll(): Promise<{ total: number; items: Film[] }> {
    return this.filmsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Film> {
    const film = await this.filmsService.findOne(id);
    if (!film) {
      throw new NotFoundException(`Фильм с ID ${id} не найден`);
    }
    return film;
  }

  @Get(':id/schedule')
  async getSchedule(
    @Param('id') id: string,
  ): Promise<{ total: number; items: Schedule[] }> {
    const film = await this.filmsService.findOne(id);
    if (!film) {
      throw new NotFoundException(`Фильм с ID ${id} не найден`);
    }
    const schedule = film.schedules || [];
    return {
      total: schedule.length,
      items: schedule,
    };
  }

  @Post()
  async create(@Body() film: Film): Promise<Film> {
    return this.filmsService.create(film);
  }
}
