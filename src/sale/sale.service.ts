// Importa los decoradores y servicios necesarios
import { Injectable, NotFoundException } from '@nestjs/common'; // Decoradores y excepciones de NestJS
import { PrismaService } from '../prisma/prisma.service'; // Servicio para interactuar con la base de datos usando Prisma
import { CreateSaleDto } from './dto/create-sale.dto'; // DTO para validar los datos al crear una venta
import { UpdateSaleDto } from './dto/update-sale.dto'; // DTO para validar los datos al actualizar una venta

// Marca esta clase como un servicio inyectable
@Injectable()
export class SaleService {
  // Inyecta el servicio de Prisma para interactuar con la base de datos
  constructor(private prisma: PrismaService) {}

  /**
   * Crea una nueva venta en la base de datos.
   * @param data - Objeto que contiene los datos de la venta (validado por CreateSaleDto).
   * @returns El registro de la venta creada.
   */
  create(data: CreateSaleDto) {
    return this.prisma.sale.create({ data }); // Usa Prisma para insertar un nuevo registro
  }

  /**
   * Recupera todas las ventas de la base de datos.
   * @returns Una lista de todas las ventas, incluyendo información del vestido y del usuario.
   */
  findAll() {
    return this.prisma.sale.findMany({
      include: {
        dress: true, // Incluye información del vestido asociado
        user: true, // Incluye información del usuario asociado
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
      where: { id }, // Busca la venta por su ID
      include: { dress: true, user: true }, // Incluye información del vestido y del usuario
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
    const exists = await this.prisma.sale.findUnique({ where: { id } }); // Verifica si la venta existe
    if (!exists) throw new NotFoundException('Venta no encontrada'); // Lanza una excepción si no existe
    return this.prisma.sale.update({ where: { id }, data }); // Actualiza el registro
  }

  /**
   * Elimina una venta específica de la base de datos.
   * @param id - El identificador único de la venta.
   * @returns El registro de la venta eliminada.
   * @throws NotFoundException si la venta no existe.
   */
  async remove(id: string) {
    const exists = await this.prisma.sale.findUnique({ where: { id } }); // Verifica si la venta existe
    if (!exists) throw new NotFoundException('Venta no encontrada'); // Lanza una excepción si no existe
    return this.prisma.sale.delete({ where: { id } }); // Elimina el registro
  }
}
