import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';

@Injectable()
export class RentalService {
  constructor(private prisma: PrismaService) {}

  /**
   * Crea una nueva renta en la base de datos.
   * @param data - Objeto que contiene los datos de la renta (validado por CreateRentalDto).
   * @returns El registro de la renta creada.
   */
  create(data: CreateRentalDto) {
    return this.prisma.rental.create({ data });
  }

  /**
   * Recupera todas las rentas de la base de datos.
   * @returns Una lista de todas las rentas, incluyendo información del vestido y del usuario.
   */
  findAll() {
    return this.prisma.rental.findMany({
      include: {
        dress: true, // Incluye información del vestido asociado
        user: true, // Incluye información del usuario asociado
      },
    });
  }

  /**
   * Recupera una renta específica por su ID.
   * @param id - El identificador único de la renta.
   * @returns El registro de la renta si existe, incluyendo información del vestido y del usuario.
   */
  findOne(id: string) {
    return this.prisma.rental.findUnique({
      where: { id },
      include: { dress: true, user: true },
    });
  }

  /**
   * Actualiza una renta específica en la base de datos.
   * @param id - El identificador único de la renta.
   * @param data - Objeto que contiene los datos a actualizar (validado por UpdateRentalDto).
   * @returns El registro de la renta actualizada.
   * @throws NotFoundException si la renta no existe.
   */
  async update(id: string, data: UpdateRentalDto) {
    const exists = await this.prisma.rental.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Renta no encontrada');
    return this.prisma.rental.update({ where: { id }, data });
  }

  /**
   * Elimina una renta específica de la base de datos.
   * @param id - El identificador único de la renta.
   * @returns El registro de la renta eliminada.
   * @throws NotFoundException si la renta no existe.
   */
  async remove(id: string) {
    const exists = await this.prisma.rental.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Renta no encontrada');
    return this.prisma.rental.delete({ where: { id } });
  }
}
