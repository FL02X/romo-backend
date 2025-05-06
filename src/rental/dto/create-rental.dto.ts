import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateRentalDto {
  @IsString()
  clientName: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsNumber()
  price: number;

  @IsUUID()
  dressId: string;

  @IsUUID()
  userId: string;
}
