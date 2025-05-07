import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('users') // '/users'
@UseGuards(AuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Recupera todos los usuarios.
   * @returns Una lista de usuarios con campos seleccionados.
   */
  @Get() // '/users'
  @Roles('ADMIN', 'STAFF')
  findAll() {
    return this.userService.findAll();
  }

  /**
   * Recupera un usuario específico por su ID.
   * @param id - El identificador único del usuario.
   * @returns El registro del usuario si existe.
   */
  @Get(':id') // '/users/:id'
  @Roles('ADMIN')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.findOne(id);
  }

  /**
   * Crea un nuevo usuario.
   * @param body - Objeto que contiene los datos del usuario.
   * @returns El registro del usuario creado.
   */
  @Post() // '/users'
  @HttpCode(201)
  @Roles('ADMIN')
  create(
    @Body()
    body: {
      email: string; // Correo electrónico del usuario
      password: string; // Contraseña del usuario
      name: string; // Nombre del usuario
      role: Role; // Rol del usuario (Role.ADMIN | Role.EMPLOYEE)
    },
  ) {
    return this.userService.create(body);
  }

  /**
   * Actualiza un usuario específico.
   * @param id - El identificador único del usuario.
   * @param body - Objeto con los datos a actualizar.
   * @returns El registro del usuario actualizado.
   */
  @Patch(':id') // '/users/:id'
  @Roles('ADMIN')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body()
    body: Partial<{
      email: string; // Correo electrónico del usuario
      name: string; // Nombre del usuario
      password: string; // Contraseña del usuario
      role: Role; // Rol del usuario
    }>,
  ) {
    return this.userService.update(id, body);
  }

  /**
   * Elimina un usuario específico.
   * @param id - El identificador único del usuario.
   * @returns El registro del usuario eliminado.
   */
  @Delete(':id') // '/users/:id'
  @Roles('ADMIN')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.remove(id);
  }
}
