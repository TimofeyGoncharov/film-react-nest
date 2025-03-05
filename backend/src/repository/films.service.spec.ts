import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { GetFilm } from '../films/dto/films.schema';
import { GetSchedule } from '../films/dto/schedule.schema';

describe('FilmsService', () => {
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilmsService],
    })
      .overrideProvider(FilmsService)
      .useValue({
        findAll: jest.fn().mockResolvedValue([mockFilm]),
        findOne: jest.fn().mockResolvedValue(mockFilm),
        create: jest.fn().mockResolvedValue(mockFilm),
      })
      .compile();

    service = module.get<FilmsService>(FilmsService);
  });

  describe('Testing findAll', () => {
    it('Check select all films', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockFilm]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('Testing findOne', () => {
    it('Check select one film by id', async () => {
      const result = await service.findOne('film-id');
      expect(result.schedules).toEqual([mockSchedule]);
      expect(service.findOne).toHaveBeenCalledWith('film-id');
    });
  });

  describe('Testing create', () => {
    it('Check create film', async () => {
      const film = await service.create(mockFilm);
      expect(film).toEqual(mockFilm);
      expect(service.create).toHaveBeenCalledWith(mockFilm);
    });
  });
});
