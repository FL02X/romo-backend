import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    // Obtiene el secreto JWT desde las variables de configuración
    const jwtSecret = config.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      // Lanza un error si el secreto no está definido
      throw new Error('JWT_SECRET is not defined in the configuration');
    }

    // Configura la estrategia JWT
    super({
      // Extrae el token JWT del encabezado Authorization con formato Bearer
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Define el secreto usado para verificar la firma del token
      secretOrKey: jwtSecret,
    });
  }

  /**
   * Método para validar el token JWT.
   * @param payload - Contenido del token JWT decodificado.
   * @returns El payload del token si es válido.
   */
  async validate(payload: { sub: string; email: string; role: string }) {
    // Retorna el payload del token, que contiene información del usuario
    return payload;
  }
}
