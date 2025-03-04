import { IsString, IsNotEmpty, IsInt, IsNumber } from 'class-validator';

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

export class GetTicket {
  @IsString()
  film: string;
  @IsString()
  session: string;
  @IsString()
  daytime: string;
  @IsString()
  day: string;
  @IsString()
  time: string;
  @IsNumber()
  row: number;
  @IsNumber()
  seat: number;
  @IsNumber()
  price: number;
}
