// Importa el decorador SetMetadata de NestJS
import { SetMetadata } from '@nestjs/common';

// Define una clave constante para los metadatos de roles
export const ROLES_KEY = 'roles'; // Clave que se usará para almacenar los roles requeridos en los metadatos

/**
 * Decorador personalizado para definir roles requeridos en controladores o métodos.
 * @param roles - Lista de roles requeridos para acceder a la ruta o método.
 * @returns Un decorador que establece los roles en los metadatos.
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
