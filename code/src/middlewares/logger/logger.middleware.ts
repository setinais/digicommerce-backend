import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: Function) {
    const { hostname, method, url } = req;
    Logger.debug(`${hostname} => ${url}`, method);
    next();
  }
}
