import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { EntitySchema } from 'typeorm';
import { Schedule } from './schedule.schema';

export function SchemaFactory<T>(classRef: new () => T): EntitySchema<T> {
  return new EntitySchema<T>({
    name: classRef.name,
    target: classRef,
    columns: Reflect.getMetadata('columns', classRef) || {},
    relations: Reflect.getMetadata('relations', classRef) || {},
  });
}

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

  @OneToMany(() => Schedule, (schedule) => schedule.film, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  schedules: Schedule[];
}

export const FilmSchema = SchemaFactory(Film);
