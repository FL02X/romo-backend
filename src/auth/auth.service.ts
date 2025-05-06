// Importa los decoradores y servicios necesarios
import { Injectable, UnauthorizedException } from '@nestjs/common'; // Decoradores y excepciones de NestJS
import { JwtService } from '@nestjs/jwt'; // Servicio para generar y verificar tokens JWT
import { PrismaService } from '../prisma/prisma.service'; // Servicio para interactuar con la base de datos usando Prisma
import * as bcrypt from 'bcrypt'; // Librería para manejar el hashing de contraseñas

// Marca esta clase como un servicio inyectable
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService, // Servicio de Prisma para interactuar con la base de datos
    private jwtService: JwtService, // Servicio de JWT para manejar tokens
  ) {}

  /**
   * Valida las credenciales de un usuario.
   * @param email - El correo electrónico del usuario.
   * @param password - La contraseña del usuario.
   * @returns El objeto del usuario si las credenciales son válidas.
   * @throws UnauthorizedException si las credenciales no son válidas.
   */
  async validateUser(email: string, password: string) {
    console.log('🔍 Validando usuario:', email);
    // Busca al usuario en la base de datos por su correo electrónico
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    console.log('Usuario encontrado:', user);
    // Si el usuario no existe, lanza una excepción
    if (!user) {
      console.log('❌ Usuario no encontrado');
      throw new UnauthorizedException('Usuario no encontrado');
    }

    console.log('✅ Usuario encontrado:', user.email);
    // Compara la contraseña proporcionada con la almacenada en la base de datos
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('🔐 Comparación de contraseñas:', isPasswordValid);

    if (!isPasswordValid) {
      console.log('❌ Contraseña incorrecta');
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    // Si las credenciales son válidas, devuelve el objeto del usuario
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
