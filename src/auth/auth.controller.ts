// Importa los decoradores y servicios necesarios
import { Controller, Post, Body } from '@nestjs/common'; // Decoradores para definir rutas y manejar solicitudes HTTP
import { AuthService } from './auth.service'; // Servicio que contiene la lógica de autenticación

// Define el controlador para manejar las rutas relacionadas con la autenticación
@Controller('auth') // Todas las rutas de este controlador estarán bajo el prefijo '/auth'
export class AuthController {
  // Inyecta el servicio AuthService para manejar la lógica de autenticación
  constructor(private readonly authService: AuthService) {}

  /**
   * Maneja el inicio de sesión de un usuario.
   * @param body - Objeto que contiene el correo electrónico y la contraseña del usuario.
   * @returns Un token JWT si las credenciales son válidas.
   */
  @Post('login') // Define que este método maneja solicitudes POST en '/auth/login'
  async login(@Body() body: { email: string; password: string }) {
    // Valida las credenciales del usuario llamando al servicio de autenticación
    console.log('🔑 Iniciando sesión con:', body.email);
    const user = await this.authService.validateUser(body.email, body.password);
    // Genera y devuelve un token JWT para el usuario autenticado
    return this.authService.login(user);
  }
}
