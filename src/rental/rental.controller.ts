// Importa los decoradores y servicios necesarios
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common'; // Decoradores para definir rutas y manejar solicitudes HTTP
import { RentalService } from './rental.service'; // Servicio que contiene la lógica de negocio para las rentas
import { CreateRentalDto } from './dto/create-rental.dto'; // DTO para validar los datos al crear una renta
import { UpdateRentalDto } from './dto/update-rental.dto'; // DTO para validar los datos al actualizar una renta
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';

// Define el controlador para manejar las rutas relacionadas con las rentas
@Controller('rentals') // Todas las rutas de este controlador estarán bajo el prefijo '/rentals'
@UseGuards(AuthGuard, RolesGuard)
export class RentalController {
  // Inyecta el servicio RentalService para manejar la lógica de negocio
  constructor(private readonly rentalService: RentalService) {}

  /**
   * Crea una nueva renta.
   * @param createRentalDto - Objeto que contiene los datos de la renta (validado por CreateRentalDto).
   * @returns El registro de la renta creada.
   */
  @Post() // Define que este método maneja solicitudes POST en '/rentals'
  @Roles('ADMIN', 'STAFF')
  create(@Body() createRentalDto: CreateRentalDto) {
    return this.rentalService.create(createRentalDto); // Llama al servicio para crear una renta
  }

  /**
   * Recupera todas las rentas.
   * @returns Una lista de todas las rentas, incluyendo información del vestido y del usuario.
   */
  @Get() // Define que este método maneja solicitudes GET en '/rentals'
  @Roles('ADMIN', 'STAFF')
  findAll() {
    return this.rentalService.findAll(); // Llama al servicio para obtener todas las rentas
  }

  /**
   * Recupera una renta específica por su ID.
   * @param id - El identificador único de la renta.
   * @returns El registro de la renta si existe, incluyendo información del vestido y del usuario.
   */
  @Get(':id') // Define que este método maneja solicitudes GET en '/rentals/:id'
  @Roles('ADMIN', 'STAFF')
  findOne(@Param('id') id: string) {
    return this.rentalService.findOne(id); // Llama al servicio para buscar una renta por su ID
  }

  /**
   * Actualiza una renta específica.
   * @param id - El identificador único de la renta.
   * @param updateRentalDto - Objeto que contiene los datos a actualizar (validado por UpdateRentalDto).
   * @returns El registro de la renta actualizada.
   */
  @Patch(':id') // Define que este método maneja solicitudes PATCH en '/rentals/:id'
  @Roles('ADMIN', 'STAFF')
  update(@Param('id') id: string, @Body() updateRentalDto: UpdateRentalDto) {
    return this.rentalService.update(id, updateRentalDto); // Llama al servicio para actualizar una renta
  }

  /**
   * Elimina una renta específica.
   * @param id - El identificador único de la renta.
   * @returns El registro de la renta eliminada.
   */
  @Delete(':id') // Define que este método maneja solicitudes DELETE en '/rentals/:id'
  @Roles('ADMIN', 'STAFF')
  remove(@Param('id') id: string) {
    return this.rentalService.remove(id); // Llama al servicio para eliminar una renta
  }
}
