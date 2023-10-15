import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { EnvironmentModule } from 'src/modules/environment/environment.module';

const { API_KEY } = EnvironmentModule.env;

@Injectable()
export class ApiKeyAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getNext();
    const token = this.extract(request.req);
    return API_KEY === token;
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  extract(req: any) {
    const token =
      req.headers?.authorization?.split(' ').at(1) ||
      req.headers?.authorization;
    if (!token) {
      const error = new UnauthorizedException('You must provide a token');
      throw error;
    }
    return token;
  }
}
