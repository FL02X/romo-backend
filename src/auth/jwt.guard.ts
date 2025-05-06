import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

// Define un guard personalizado para proteger rutas usando la estrategia 'jwt'
@Injectable()
export class JwtGuard extends AuthGuard('jwt') {}
