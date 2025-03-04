import {
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsEmail,
  IsPhoneNumber,
  IsMobilePhone,
} from 'class-validator';
import { Type } from 'class-transformer';
import { GetTicket, Ticket } from './ticket.schema';

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

export class GetOrder {
  @IsArray()
  tickets: GetTicket[];
  @IsEmail()
  email: string;
  @IsMobilePhone('ru-RU')
  phone: string;
}

export class ResultOrder {
  film: string;
  session: string;
  row: number;
  seat: number;
  price: number;
  daytime: string;
}
