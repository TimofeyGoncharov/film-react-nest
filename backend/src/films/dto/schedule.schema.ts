import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Film, SchemaFactory } from './films.schema';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  daytime: string;

  @Column()
  hall: number;

  @Column()
  rows: number;

  @Column()
  seats: number;

  @Column()
  price: number;

  @Column('simple-array', { default: '' })
  taken: string[];

  @ManyToOne(() => Film, (film) => film.schedules, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  film: Film;
}

export type ScheduleDocument = Schedule;
export const ScheduleSchema = SchemaFactory(Schedule);
