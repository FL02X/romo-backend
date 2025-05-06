// Importa PartialType para reutilizar y extender un DTO existente
import { PartialType } from '@nestjs/mapped-types';
// Importa el DTO de creación de vestidos
import { CreateDressDto } from './create-dress.dto';

// Define un DTO para actualizar un vestido
export class UpdateDressDto extends PartialType(CreateDressDto) {}
