import { Injectable } from '@nestjs/common';
import { CreateBrandInput } from './dto/create-brand.input';
import { UpdateBrandInput } from './dto/update-brand.input';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(private readonly prisma: PrismaService) {}

  create(createBrandInput: CreateBrandInput) {
    return 'This action adds a new brand';
  }

  async findAll() {
    return await this.prisma.brand.findMany({
      where: {},
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} brand`;
  }

  update(id: number, updateBrandInput: UpdateBrandInput) {
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
