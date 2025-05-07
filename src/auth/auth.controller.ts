import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth') // '/auth'
export class AuthController {
  // Servicio AuthService
  constructor(private readonly authService: AuthService) {}

  /**
   * Maneja el inicio de sesión de un usuario.
   * @param body - Objeto que contiene el correo electrónico y la contraseña del usuario.
   * @returns Un token JWT si las credenciales son válidas.
   */
  @Post('login') // '/auth/login'
  async login(@Body() body: { email: string; password: string }) {
    console.log('🔑 Iniciando sesión con:', body.email);
    const user = await this.authService.validateUser(body.email, body.password);
    return this.authService.login(user);
  }
}
