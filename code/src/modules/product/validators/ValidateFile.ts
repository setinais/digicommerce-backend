import { BadRequestException, Logger, ParseFilePipe } from '@nestjs/common';
import * as fs from 'fs';

export class ValidateFile extends ParseFilePipe {
  private file: any;

  async transform(value: any) {
    this.file = value;
    return await super.transform(value);
  }

  protected exceptionFactory: (error: string) => any = (error: string) => {
    fs.unlinkSync(this.file.path);
    Logger.debug(`File ${this.file.path} has been removed`);
    return new BadRequestException(error);
  };
}
