// Importa los decoradores y servicios necesarios
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common'; // Decoradores para definir rutas y manejar solicitudes HTTP
import { DressService } from './dress.service'; // Servicio que contiene la lógica de negocio para los vestidos
import { CreateDressDto } from './dto/create-dress.dto'; // DTO para validar los datos al crear un vestido
import { UpdateDressDto } from './dto/update-dress.dto'; // DTO para validar los datos al actualizar un vestido
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';

// Define el controlador para manejar las rutas relacionadas con los vestidos
@Controller('dresses') // Todas las rutas de este controlador estarán bajo el prefijo '/dresses'
@UseGuards(AuthGuard, RolesGuard)
export class DressController {
  // Inyecta el servicio DressService para manejar la lógica de negocio
  constructor(private readonly dressService: DressService) {}

  /**
   * Crea un nuevo vestido.
   * @param createDressDto - Objeto que contiene los datos del vestido (validado por CreateDressDto).
   * @returns El registro del vestido creado.
   */
  @Post() // Define que este método maneja solicitudes POST en '/dresses'
  @Roles('ADMIN', 'STAFF')
  create(@Body() createDressDto: CreateDressDto) {
    return this.dressService.create(createDressDto); // Llama al servicio para crear un vestido
  }

  /**
   * Recupera todos los vestidos.
   * @returns Una lista de todos los vestidos.
   */
  @Get() // Define que este método maneja solicitudes GET en '/dresses'
  @Roles('ADMIN', 'STAFF')
  findAll() {
    return this.dressService.findAll(); // Llama al servicio para obtener todos los vestidos
  }

  /**
   * Recupera un vestido específico por su ID.
   * @param id - El identificador único del vestido.
   * @returns El registro del vestido si existe, o null si no se encuentra.
   */
  @Get(':id') // Define que este método maneja solicitudes GET en '/dresses/:id'
  @Roles('ADMIN', 'STAFF')
  findOne(@Param('id') id: string) {
    return this.dressService.findOne(id); // Llama al servicio para buscar un vestido por su ID
  }

  /**
   * Actualiza un vestido específico.
   * @param id - El identificador único del vestido.
   * @param updateDressDto - Objeto que contiene los datos a actualizar (validado por UpdateDressDto).
   * @returns El registro del vestido actualizado.
   */
  @Put(':id') // Define que este método maneja solicitudes PUT en '/dresses/:id'
  @Roles('ADMIN', 'STAFF')
  update(@Param('id') id: string, @Body() updateDressDto: UpdateDressDto) {
    return this.dressService.update(id, updateDressDto); // Llama al servicio para actualizar un vestido
  }

  /**
   * Elimina un vestido específico.
   * @param id - El identificador único del vestido.
   * @returns El registro del vestido eliminado.
   */
  @Delete(':id') // Define que este método maneja solicitudes DELETE en '/dresses/:id'
  @Roles('ADMIN', 'STAFF')
  remove(@Param('id') id: string) {
    return this.dressService.remove(id); // Llama al servicio para eliminar un vestido
  }
}
