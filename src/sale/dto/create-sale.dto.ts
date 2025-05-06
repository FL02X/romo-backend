import { IsDateString, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateSaleDto {
  @IsString()
  clientName: string;

  @IsDateString()
  saleDate: string;

  @IsNumber()
  price: number;

  @IsUUID()
  dressId: string;

  @IsUUID()
  userId: string;
}
