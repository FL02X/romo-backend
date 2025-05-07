import {
  CanActivate, // Interfaz para implementar guards personalizados
  ExecutionContext, // Acceder a la solicitud actual
  Injectable, // Inyectable en NestJS
  UnauthorizedException, // Accesos no autorizados
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'; // tokens JWT
import { Reflector } from '@nestjs/core'; // metadata personalizados
import { Request } from 'express'; // solicitudes HTTP

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService, // servicio para verificar tokens JWT
    private reflector: Reflector, // servicio para leer metadata personalizados
  ) {}

  /**
   * Método principal del guard que determina si una solicitud puede continuar.
   * @param context - Contexto de ejecución que contiene la solicitud actual.
   * @returns `true` si la solicitud está autorizada, de lo contrario lanza una excepción.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Obtiene la solicitud HTTP actual
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization; // Obtiene el encabezado

    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
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
      throw new UnauthorizedException('Invalid token');
    }
  }
}
