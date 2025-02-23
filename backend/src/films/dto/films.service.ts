import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film, FilmDocument } from './films.schema';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film)
    private filmDocument: Repository<FilmDocument>,
  ) {}

  async findAll(): Promise<{ total: number; items: Film[] }> {
    const films = await this.filmDocument.find();
    return {
      total: films.length,
      items: films,
    };
  }

  async findOne(id: string): Promise<Film> {
    const film = await this.filmDocument.findOne({
      where: { id },
      relations: ['schedules'],
    });
    if (!film) {
      throw new NotFoundException(`Фильм с ID ${id} не найден`);
    }
    return film;
  }

  async create(film: Film): Promise<Film> {
    const newFilm = this.filmDocument.create(film);
    return await this.filmDocument.save(newFilm);
  }
}
