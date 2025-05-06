import { IsString } from 'class-validator';

// Define un Data Transfer Object (DTO) para manejar las credenciales de autenticación
export class AuthDto {
  @IsString()
  email: string; // Correo electrónico del usuario
  @IsString()
  password: string; // Contraseña del usuario
}
