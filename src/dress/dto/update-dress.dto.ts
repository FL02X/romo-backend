// Importa PartialType para reutilizar y extender un DTO existente
import { PartialType } from '@nestjs/mapped-types';
import { CreateDressDto } from './create-dress.dto';
export class UpdateDressDto extends PartialType(CreateDressDto) {}
