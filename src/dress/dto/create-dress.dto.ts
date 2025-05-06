import { IsNotEmpty, IsNumber, IsString, IsEnum } from 'class-validator';
import { DressStatus } from '@prisma/client';

/*
    {
        "name": "Vestido rojo",
        "size": "M",
        "color": "Rojo",
        "price": 1200,
        "rentalPrice": 300
    }
*/

export class CreateDressDto {
  @IsString()
  name: string;

  @IsString()
  size: string;

  @IsString()
  color: string;

  @IsNumber()
  price: number;

  @IsNumber()
  rentalPrice: number;

  @IsEnum(DressStatus, {
    message: 'Status must be one of DISPONIBLE, RENTADO, VENDIDO',
  })
  status?: DressStatus;
}
