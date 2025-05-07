import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  /**
   * Valida las credenciales de un usuario.
   * @param email - El correo electrónico del usuario.
   * @param password - La contraseña del usuario.
   * @returns El objeto del usuario si las credenciales son válidas.
   * @throws UnauthorizedException si las credenciales no son válidas.
   */
  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    console.log('✅ Usuario encontrado:', user.email);
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log('❌ Contraseña incorrecta');
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    console.log('🎉 Usuario autenticado correctamente');
    return user;
  }

  /**
   * Genera un token JWT para un usuario autenticado.
   * @param user - El objeto del usuario autenticado.
   * @returns Un objeto que contiene el token de acceso.
   */
  async login(user: any) {
    // Define el payload del token JWT
    const payload = {
      sub: user.id, // Identificador único del usuario
      email: user.email, // Correo electrónico del usuario
      role: user.role, // Rol del usuario
    };

    // Genera y devuelve el token JWT
    console.log('🧾 Token generado');
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
