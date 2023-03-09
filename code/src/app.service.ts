import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getRoot(): string {
    return `Service is running! ${process.uptime()}`;
  }
}
