import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE } from '@prisma/client';
import { IS_PUBLIC_KEY } from 'src/core/decorators/public.decorator';
import { ROLES_KEY } from 'src/core/decorators/roles.decorator';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const requiredRoles = this.reflector.getAllAndOverride<ROLE[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    let user: User;
    if (this.restOrGraphql(context.getClass().toString())) {
      user = context.switchToHttp().getNext().req.user as User;
    } else {
      user = context.switchToHttp().getRequest().user as User;
    }

    if (!user)
      throw new InternalServerErrorException([
        'Error internal, please try again later.',
      ]);

    if (user.role === ROLE.ADMIN) return true;

    if (!requiredRoles || !requiredRoles.includes(user.role)) {
      throw new ForbiddenException([
        'You not have permission to perform this action',
      ]);
    }
    return true;
  }

  /*
  If return True = Graphql request
  If return False = Rest request
  */
  private restOrGraphql(contextClass: string): boolean {
    const nameClass = contextClass.split(' ')[1];
    return nameClass.indexOf('Resolver') > -1;
  }
}
