import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { CreateFilm, GetFilm } from './dto/films.schema';
import { FilmsService } from '../repository/films.service';
import { GetSchedule } from './dto/schedule.schema';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  const mockSchedule: GetSchedule = {
    id: 'schedule_id',
    daytime: '2023-10-10T10:00:00Z',
    hall: 1,
    rows: 5,
    seats: 100,
    price: 10,
    taken: [],
  };

  const mockFilm: GetFilm = {
    id: 'film_id',
    rating: 8.5,
    director: 'Гай РИЧИ',
    tags: 'Рекомендуемые',
    image: 'http://example.ru/image.jpg',
    cover: 'http://example.ru/cover.jpg',
    title: 'Film Title',
    about: 'About the film',
    description: 'Description of the film',
    schedules: [mockSchedule],
  };

  const mockCreateFilmDTO: CreateFilm = {
    rating: 8.5,
    director: 'Гай РИЧИ',
    tags: 'Рекомендуемые',
    image: 'http://example.ru/image.jpg',
    cover: 'http://example.ru/cover.jpg',
    title: 'Title',
    about: 'About the film',
    description: 'Description of the film',
    schedules: [mockSchedule],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    })
      .overrideProvider(FilmsService)
      .useValue({
        findAll: jest.fn().mockResolvedValue([mockFilm]),
        findOne: jest.fn().mockResolvedValue(mockFilm),
        create: jest.fn(),
      })
      .compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  describe('Testing findAll', () => {
    it('return all films', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([mockFilm]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('tesing getSchedule', () => {
    it('return schedule for film', async () => {
      const result = await controller.getSchedule('film-id');
      expect(result.items).toEqual([mockSchedule]);
      expect(service.findOne).toHaveBeenCalledWith('film-id');
    });
  });

  describe('Testing create', () => {
    it('create film', async () => {
      (service.create as jest.Mock).mockResolvedValue(mockFilm);

      const result = await controller.create(mockCreateFilmDTO);

      expect(result).toEqual(mockFilm);
      expect(service.create).toHaveBeenCalledWith(mockCreateFilmDTO);
    });
  });
});
