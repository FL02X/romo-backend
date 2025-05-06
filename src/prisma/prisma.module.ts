import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Marca este módulo como global para que esté disponible en toda la aplicación
@Module({
  providers: [PrismaService], // Registra PrismaService como proveedor
  exports: [PrismaService], // Exporta PrismaService para que otros módulos puedan usarlo
})
export class PrismaModule {}
