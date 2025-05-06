// Importa los decoradores y servicios necesarios
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'; // Interfaz y decoradores para implementar guards
import { Reflector } from '@nestjs/core'; // Servicio para acceder a metadatos personalizados
import { ROLES_KEY } from '../decorators/roles.decorator'; // Clave para acceder a los roles definidos en los decoradores

// Marca esta clase como un guard inyectable
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {} // Inyecta el servicio Reflector para leer metadatos

  /**
   * Método principal del guard que determina si una solicitud puede continuar.
   * @param context - Contexto de ejecución que contiene la solicitud actual.
   * @returns `true` si el usuario tiene los roles requeridos, de lo contrario `false`.
   */
  canActivate(context: ExecutionContext): boolean {
    // Obtiene los roles requeridos desde los metadatos del controlador o del manejador
    const requiredRoles = this.reflector.getAllAndMerge<string[]>(ROLES_KEY, [
      context.getHandler(), // Lee los metadatos del método manejador
      context.getClass(), // Lee los metadatos de la clase del controlador
    ]);

    // Si no hay roles requeridos, permite el acceso
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // Obtiene el usuario de la solicitud actual
    const { user } = context.switchToHttp().getRequest();
    console.log('Rol del usuario en RolesGuard:', user?.role);
    console.log('Roles requeridos:', requiredRoles);
    console.log('Rol del usuario:', user?.role);
    // Verifica si el rol del usuario está incluido en los roles requeridos
    return requiredRoles.includes(user?.role);
  }
}
