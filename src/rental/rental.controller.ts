import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RentalService } from './rental.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('rentals') // '/rentals'
@UseGuards(AuthGuard, RolesGuard)
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  /**
   * Crea una nueva renta.
   * @param createRentalDto - Objeto que contiene los datos de la renta (validado por CreateRentalDto).
   * @returns El registro de la renta creada.
   */
  @Post() // '/rentals'
  @Roles('ADMIN', 'STAFF')
  create(@Body() createRentalDto: CreateRentalDto) {
    return this.rentalService.create(createRentalDto);
  }

  /**
   * Recupera todas las rentas.
   * @returns Una lista de todas las rentas, incluyendo información del vestido y del usuario.
   */
  @Get() // '/rentals'
  @Roles('ADMIN', 'STAFF')
  findAll() {
    return this.rentalService.findAll();
  }

  /**
   * Recupera una renta específica por su ID.
   * @param id - El identificador único de la renta.
   * @returns El registro de la renta si existe, incluyendo información del vestido y del usuario.
   */
  @Get(':id') // '/rentals/:id'
  @Roles('ADMIN', 'STAFF')
  findOne(@Param('id') id: string) {
    return this.rentalService.findOne(id);
  }

  /**
   * Actualiza una renta específica.
   * @param id - El identificador único de la renta.
   * @param updateRentalDto - Objeto que contiene los datos a actualizar (validado por UpdateRentalDto).
   * @returns El registro de la renta actualizada.
   */
  @Patch(':id') // '/rentals/:id'
  @Roles('ADMIN', 'STAFF')
  update(@Param('id') id: string, @Body() updateRentalDto: UpdateRentalDto) {
    return this.rentalService.update(id, updateRentalDto);
  }

  /**
   * Elimina una renta específica.
   * @param id - El identificador único de la renta.
   * @returns El registro de la renta eliminada.
   */
  @Delete(':id') // '/rentals/:id'
  @Roles('ADMIN', 'STAFF')
  remove(@Param('id') id: string) {
    return this.rentalService.remove(id);
  }
}
