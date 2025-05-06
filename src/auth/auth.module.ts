import { Module } from '@nestjs/common'; // Decorador para definir un módulo en NestJS
import { AuthService } from './auth.service'; // Servicio que contiene la lógica de autenticación
import { AuthController } from './auth.controller'; // Controlador que maneja las rutas de autenticación
import { JwtModule } from '@nestjs/jwt'; // Módulo para manejar tokens JWT
import { JwtStrategy } from './strategy/jwt.strategy'; // Estrategia para validar tokens JWT
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  // Importa otros módulos necesarios para este módulo
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PrismaService],
  exports: [JwtModule],
})
export class AuthModule {}
