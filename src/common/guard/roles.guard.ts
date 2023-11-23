import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../enum/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // No specific roles required, allow access
    }

    const { user } = context.switchToHttp().getRequest();
    if (!user || !user.roles || user.roles.length === 0) {
      return false; // User roles not found or empty, deny access
    }

    return user.roles.some((userRole) => requiredRoles.includes(userRole));
  }
}
