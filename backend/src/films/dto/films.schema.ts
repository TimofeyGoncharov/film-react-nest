import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { GetSchedule, Schedule } from './schedule.schema';
import { IsFQDN, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export type FilmDocument = Film & Document;

@Entity('films')
export class Film {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  director: string;

  @Column('float')
  rating: number;

  @Column('simple-array')
  tags: string;

  @Column()
  image: string;

  @Column()
  cover: string;

  @Column()
  about: string;

  @Column()
  description: string;

  @OneToMany(() => Schedule, (schedule) => schedule.film)
  schedules: Schedule[];
}

export class GetFilm {
  id: string;
  rating: number;
  director: string;
  tags: string;
  image: string;
  cover: string;
  title: string;
  about: string;
  description: string;
  schedules: GetSchedule[];
}
export class CreateFilm {
  @IsNumber()
  rating: number;
  @IsString()
  director: string;
  tags: string;
  @IsFQDN()
  image: string;
  @IsFQDN()
  cover: string;
  @IsString()
  title: string;
  @IsString()
  about: string;
  @IsString()
  description: string;
  @IsNotEmpty()
  schedules: GetSchedule[];
}
