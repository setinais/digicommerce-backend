import {
  BadRequestException,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from 'src/configs/multer-config';
import { JwtAuthGuard } from 'src/guards/jwt-auth/jwt-auth.guard';
import { RoleGuard } from 'src/guards/role/role.guard';
import { UpdateProductInput } from './dto/update-product.input';
import * as fs from 'fs';
import { ValidateFile } from './validators/ValidateFile';

@Controller('product')
// @UseGuards(JwtAuthGuard, RoleGuard)
export class ProductController {
  @Post('/update-picture/:id')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async updatePicture(
    @Request() req: any,
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile(
      new ValidateFile({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5000000 }),
          new FileTypeValidator({ fileType: '^image/(jpeg|png|jpg)$' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const product = new UpdateProductInput();
    product.id = id;

    console.log(id, file);
    return `${req.protocol}://${req.get('host')}/${file.path}`;
  }
}
