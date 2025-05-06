// Importa los decoradores y servicios necesarios
import {
  CanActivate, // Interfaz para implementar guards personalizados
  ExecutionContext, // Contexto de ejecución para acceder a la solicitud actual
  Injectable, // Marca la clase como inyectable en NestJS
  UnauthorizedException, // Excepción para manejar accesos no autorizados
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'; // Servicio para manejar tokens JWT
import { Reflector } from '@nestjs/core'; // Servicio para acceder a metadatos personalizados
import { Request } from 'express'; // Tipo para representar solicitudes HTTP

// Marca esta clase como un guard inyectable
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService, // Servicio para verificar tokens JWT
    private reflector: Reflector, // Servicio para leer metadatos personalizados
  ) {}

  /**
   * Método principal del guard que determina si una solicitud puede continuar.
   * @param context - Contexto de ejecución que contiene la solicitud actual.
   * @returns `true` si la solicitud está autorizada, de lo contrario lanza una excepción.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Obtiene la solicitud HTTP actual
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization; // Obtiene el encabezado de autorización

    // Si no hay un encabezado de autorización, lanza una excepción
    if (!authHeader) {
      throw new UnauthorizedException('No token provided'); // Error 401: No se proporcionó un token
    }

    // Divide el encabezado de autorización para obtener el token (formato: "Bearer <token>")
    const [, token] = authHeader.split(' ');

    try {
      // Verifica el token JWT y obtiene el payload
      const payload = await this.jwtService.verifyAsync(token);

      // Almacena el payload del usuario en la solicitud para usarlo más adelante
      request.user = payload;
      console.log('Payload en AuthGuard:', request.user);

      // Si el token es válido, permite que la solicitud continúe
      return true;
    } catch (e) {
      // Si el token no es válido, lanza una excepción
      throw new UnauthorizedException('Invalid token'); // Error 401: Token inválido
    }
  }
}
