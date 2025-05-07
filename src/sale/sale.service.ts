import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Injectable()
export class SaleService {
  constructor(private prisma: PrismaService) {}

  /**
   * Crea una nueva venta en la base de datos.
   * @param data - Objeto que contiene los datos de la venta (validado por CreateSaleDto).
   * @returns El registro de la venta creada.
   */
  create(data: CreateSaleDto) {
    return this.prisma.sale.create({ data });
  }

  /**
   * Recupera todas las ventas de la base de datos.
   * @returns Una lista de todas las ventas, incluyendo información del vestido y del usuario.
   */
  findAll() {
    return this.prisma.sale.findMany({
      include: {
        dress: true,
        user: true,
      },
    });
  }

  /**
   * Recupera una venta específica por su ID.
   * @param id - El identificador único de la venta.
   * @returns El registro de la venta si existe, incluyendo información del vestido y del usuario.
   */
  findOne(id: string) {
    return this.prisma.sale.findUnique({
      where: { id },
      include: { dress: true, user: true },
    });
  }

  /**
   * Actualiza una venta específica en la base de datos.
   * @param id - El identificador único de la venta.
   * @param data - Objeto que contiene los datos a actualizar (validado por UpdateSaleDto).
   * @returns El registro de la venta actualizada.
   * @throws NotFoundException si la venta no existe.
   */
  async update(id: string, data: UpdateSaleDto) {
    const exists = await this.prisma.sale.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Venta no encontrada');
    return this.prisma.sale.update({ where: { id }, data });
  }

  /**
   * Elimina una venta específica de la base de datos.
   * @param id - El identificador único de la venta.
   * @returns El registro de la venta eliminada.
   * @throws NotFoundException si la venta no existe.
   */
  async remove(id: string) {
    const exists = await this.prisma.sale.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Venta no encontrada');
    return this.prisma.sale.delete({ where: { id } });
  }
}
