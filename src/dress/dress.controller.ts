import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { DressService } from './dress.service';
import { CreateDressDto } from './dto/create-dress.dto';
import { UpdateDressDto } from './dto/update-dress.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('dresses') // '/dresses'
@UseGuards(AuthGuard, RolesGuard)
export class DressController {
  constructor(private readonly dressService: DressService) {}

  /**
   * Crea un nuevo vestido.
   * @param createDressDto - Objeto que contiene los datos del vestido (validado por CreateDressDto).
   * @returns El registro del vestido creado.
   */
  @Post() // '/dresses'
  @Roles('ADMIN', 'STAFF')
  create(@Body() createDressDto: CreateDressDto) {
    return this.dressService.create(createDressDto);
  }

  /**
   * Recupera todos los vestidos.
   * @returns Una lista de todos los vestidos.
   */
  @Get() // '/dresses'
  @Roles('ADMIN', 'STAFF')
  findAll() {
    return this.dressService.findAll();
  }

  /**
   * Recupera un vestido específico por su ID.
   * @param id - El identificador único del vestido.
   * @returns El registro del vestido si existe, o null si no se encuentra.
   */
  @Get(':id') // '/dresses/:id'
  @Roles('ADMIN', 'STAFF')
  findOne(@Param('id') id: string) {
    return this.dressService.findOne(id);
  }

  /**
   * Actualiza un vestido específico.
   * @param id - El identificador único del vestido.
   * @param updateDressDto - Objeto que contiene los datos a actualizar (validado por UpdateDressDto).
   * @returns El registro del vestido actualizado.
   */
  @Put(':id') // '/dresses/:id'
  @Roles('ADMIN', 'STAFF')
  update(@Param('id') id: string, @Body() updateDressDto: UpdateDressDto) {
    return this.dressService.update(id, updateDressDto);
  }

  /**
   * Elimina un vestido específico.
   * @param id - El identificador único del vestido.
   * @returns El registro del vestido eliminado.
   */
  @Delete(':id') // '/dresses/:id'
  @Roles('ADMIN', 'STAFF')
  remove(@Param('id') id: string) {
    return this.dressService.remove(id);
  }
}
