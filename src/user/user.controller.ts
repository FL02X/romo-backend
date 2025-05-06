// Importa los decoradores y servicios necesarios
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
} from '@nestjs/common'; // Decoradores para definir rutas y manejar solicitudes HTTP
import { UserService } from './user.service'; // Servicio que contiene la lógica de negocio para los usuarios
import { Role } from '@prisma/client'; // Enum para los roles definidos en el esquema de Prisma
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';

// Define el controlador para manejar las rutas relacionadas con los usuarios
@Controller('users') // Todas las rutas de este controlador estarán bajo el prefijo '/users'
@UseGuards(AuthGuard, RolesGuard) // Aplica el guardia de roles para proteger las rutas
export class UserController {
  constructor(private readonly userService: UserService) {} // Inyecta el servicio UserService para manejar la lógica de negocio

  /**
   * Recupera todos los usuarios.
   * @returns Una lista de usuarios con campos seleccionados.
   */
  @Get() // Define que este método maneja solicitudes GET en '/users'
  @Roles('ADMIN', 'STAFF')
  findAll() {
    return this.userService.findAll(); // Llama al servicio para obtener todos los usuarios
  }

  /**
   * Recupera un usuario específico por su ID.
   * @param id - El identificador único del usuario.
   * @returns El registro del usuario si existe.
   */
  @Get(':id') // Define que este método maneja solicitudes GET en '/users/:id'
  @Roles('ADMIN')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.findOne(id); // Llama al servicio para buscar un usuario por su ID
  }

  /**
   * Crea un nuevo usuario.
   * @param body - Objeto que contiene los datos del usuario.
   * @returns El registro del usuario creado.
   */
  @Post() // Define que este método maneja solicitudes POST en '/users'
  @HttpCode(201) // Establece el código de respuesta HTTP a 201 (Created)
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
    return this.userService.create(body); // Llama al servicio para crear un usuario
  }

  /**
   * Actualiza un usuario específico.
   * @param id - El identificador único del usuario.
   * @param body - Objeto con los datos a actualizar.
   * @returns El registro del usuario actualizado.
   */
  @Patch(':id') // Define que este método maneja solicitudes PATCH en '/users/:id'
  @Roles('ADMIN')
  update(
    @Param('id', new ParseUUIDPipe()) id: string, // Valida que el ID sea un UUID válido
    @Body()
    body: Partial<{
      email: string; // Correo electrónico del usuario
      name: string; // Nombre del usuario
      password: string; // Contraseña del usuario
      role: Role; // Rol del usuario
    }>,
  ) {
    return this.userService.update(id, body); // Llama al servicio para actualizar un usuario
  }

  /**
   * Elimina un usuario específico.
   * @param id - El identificador único del usuario.
   * @returns El registro del usuario eliminado.
   */
  @Delete(':id') // Define que este método maneja solicitudes DELETE en '/users/:id'
  @Roles('ADMIN')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.remove(id); // Llama al servicio para eliminar un usuario
  }
}
