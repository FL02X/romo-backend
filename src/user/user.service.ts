import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Recupera todos los usuarios de la base de datos.
   * @returns Una lista de usuarios con campos seleccionados.
   */
  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true, // Devuelve el ID del usuario
        email: true, // Devuelve el correo electrónico del usuario
        name: true, // Devuelve el nombre del usuario
        role: true, // Devuelve el rol del usuario
        createdAt: true, // Devuelve la fecha de creación del usuario
      },
    });
  }

  /**
   * Recupera un usuario específico por su ID.
   * @param id - El identificador único del usuario.
   * @returns El registro del usuario si existe.
   * @throws NotFoundException si el usuario no existe.
   */
  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id }, // Busca el usuario por su ID
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) throw new NotFoundException('Usuario no encontrado'); // Lanza una excepción si no se encuentra el usuario
    return user; // Devuelve el usuario encontrado
  }

  /**
   * Crea un nuevo usuario en la base de datos.
   * @param data - Objeto que contiene los datos del usuario.
   * @returns El registro del usuario creado.
   */
  async create(data: {
    email: string;
    password: string;
    name: string;
    role: Role;
  }) {
    // Hashea la contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.user.create({
      data: {
        email: data.email, // Correo electrónico del usuario
        password: hashedPassword, // Contraseña hasheada
        name: data.name, // Nombre del usuario
        role: data.role, // Rol del usuario (ADMIN, USER, etc.)
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });
  }

  /**
   * Actualiza un usuario específico en la base de datos.
   * @param id - El identificador único del usuario.
   * @param data - Objeto con los datos a actualizar.
   * @returns El registro del usuario actualizado.
   * @throws NotFoundException si el usuario no existe.
   */
  async update(
    id: string,
    data: Partial<{
      email: string;
      name: string;
      role: Role;
      password: string;
    }>,
  ) {
    // Verifica si el usuario existe
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('Usuario no encontrado'); // Lanza una excepción si no se encuentra el usuario

    const updatedData: any = { ...data };

    // Si se proporciona una nueva contraseña, la hashea antes de actualizar
    if (data.password) {
      updatedData.password = await bcrypt.hash(data.password, 10);
    }

    return this.prisma.user.update({
      where: { id }, // Actualiza el usuario por su ID
      data: updatedData, // Datos actualizados
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });
  }

  /**
   * Elimina un usuario específico de la base de datos.
   * @param id - El identificador único del usuario.
   * @returns El registro del usuario eliminado.
   * @throws NotFoundException si el usuario no existe.
   */
  async remove(id: string) {
    // Verifica si el usuario existe
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('Usuario no encontrado'); // Lanza una excepción si no se encuentra el usuario

    return this.prisma.user.delete({ where: { id } }); // Elimina el usuario
  }
}
