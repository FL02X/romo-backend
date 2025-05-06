import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  /**
   * Método que se ejecuta automáticamente cuando el módulo se inicializa.
   * Establece la conexión con la base de datos.
   */
  async onModuleInit() {
    await this.$connect(); // Conecta el cliente de Prisma a la base de datos
  }

  /**
   * Método que se ejecuta automáticamente cuando el módulo se destruye.
   * Cierra la conexión con la base de datos.
   */
  async onModuleDestroy() {
    await this.$disconnect(); // Desconecta el cliente de Prisma de la base de datos
  }
}
