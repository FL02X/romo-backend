// Importa los decoradores y servicios necesarios
import { Injectable, NotFoundException } from '@nestjs/common'; // Decoradores y excepciones de NestJS
import { PrismaService } from '../prisma/prisma.service'; // Servicio para interactuar con la base de datos usando Prisma
import { CreateRentalDto } from './dto/create-rental.dto'; // DTO para validar los datos al crear una renta
import { UpdateRentalDto } from './dto/update-rental.dto'; // DTO para validar los datos al actualizar una renta

// Marca esta clase como un servicio inyectable
@Injectable()
export class RentalService {
  // Inyecta el servicio de Prisma para interactuar con la base de datos
  constructor(private prisma: PrismaService) {}

  /**
   * Crea una nueva renta en la base de datos.
   * @param data - Objeto que contiene los datos de la renta (validado por CreateRentalDto).
   * @returns El registro de la renta creada.
   */
  create(data: CreateRentalDto) {
    return this.prisma.rental.create({ data }); // Usa Prisma para insertar un nuevo registro
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
      where: { id }, // Busca la renta por su ID
      include: { dress: true, user: true }, // Incluye información del vestido y del usuario
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
    const exists = await this.prisma.rental.findUnique({ where: { id } }); // Verifica si la renta existe
    if (!exists) throw new NotFoundException('Renta no encontrada'); // Lanza una excepción si no existe
    return this.prisma.rental.update({ where: { id }, data }); // Actualiza el registro
  }

  /**
   * Elimina una renta específica de la base de datos.
   * @param id - El identificador único de la renta.
   * @returns El registro de la renta eliminada.
   * @throws NotFoundException si la renta no existe.
   */
  async remove(id: string) {
    const exists = await this.prisma.rental.findUnique({ where: { id } }); // Verifica si la renta existe
    if (!exists) throw new NotFoundException('Renta no encontrada'); // Lanza una excepción si no existe
    return this.prisma.rental.delete({ where: { id } }); // Elimina el registro
  }
}
