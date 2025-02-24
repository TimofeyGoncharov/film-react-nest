import {
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsEmail,
  IsPhoneNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Ticket } from './ticket.schema';

export class CreateOrder {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Ticket)
  tickets: Ticket[];
}

export class ResultOrder {
  film: string;
  session: string;
  row: number;
  seat: number;
  price: number;
  daytime: string;
}
