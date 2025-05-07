import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDressDto } from './dto/create-dress.dto';
import { UpdateDressDto } from './dto/update-dress.dto';

@Injectable()
export class DressService {
  constructor(private prisma: PrismaService) {}

  /**
   * Crea un nuevo vestido en la base de datos.
   * @param data - Objeto que contiene los datos del vestido (validado por CreateDressDto).
   * @returns El registro del vestido creado.
   */
  create(data: CreateDressDto) {
    return this.prisma.dress.create({ data });
  }

  /**
   * Recupera todos los vestidos de la base de datos.
   * @returns Una lista de todos los vestidos.
   */
  findAll() {
    return this.prisma.dress.findMany();
  }

  /**
   * Recupera un vestido específico por su ID.
   * @param id - El identificador único del vestido.
   * @returns El registro del vestido si existe, o null si no se encuentra.
   */
  findOne(id: string) {
    return this.prisma.dress.findUnique({ where: { id } });
  }

  /**
   * Actualiza un vestido específico en la base de datos.
   * @param id - El identificador único del vestido.
   * @param data - Objeto que contiene los datos a actualizar (validado por UpdateDressDto).
   * @returns El registro del vestido actualizado.
   */
  update(id: string, data: UpdateDressDto) {
    return this.prisma.dress.update({
      where: { id }, // Especifica el ID del vestido a actualizar
      data, // Datos a actualizar
    });
  }

  /**
   * Elimina un vestido específico de la base de datos.
   * @param id - El identificador único del vestido.
   * @returns El registro del vestido eliminado.
   */
  remove(id: string) {
    return this.prisma.dress.delete({ where: { id } });
  }
}
