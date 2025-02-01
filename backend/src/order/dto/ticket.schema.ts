import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class Ticket {
  @IsString()
  @IsNotEmpty()
  film: string;

  @IsString()
  @IsNotEmpty()
  session: string;

  @IsInt()
  @IsNotEmpty()
  row: number;

  @IsInt()
  @IsNotEmpty()
  seat: number;

  @IsInt()
  @IsNotEmpty()
  price: number;
}
