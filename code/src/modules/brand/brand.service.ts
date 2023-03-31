import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { FindAllBrandInput } from './dto/find-all-brand.input';
import { FindOneBrandInput } from './dto/find-one-brand.input';
import { UpdateBrandInput } from './dto/update-brand.input';

@Injectable()
export class BrandService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBrandInput: Prisma.BrandCreateInput) {
    return await this.prisma.brand.create({
      data: createBrandInput,
    });
  }

  async findAll(findAllBrandInput: FindAllBrandInput) {
    const conditions = {
      where: {
        createdAt: findAllBrandInput.createdAt,
        updatedAt: findAllBrandInput.updatedAt,
        name: findAllBrandInput.name,
      },
    };
    const [total, items] = (await this.prisma.$transaction([
      this.prisma.brand.count({
        ...conditions,
      }),
      this.prisma.brand.findMany({
        ...conditions,
        take:
          findAllBrandInput &&
          findAllBrandInput.take &&
          findAllBrandInput.take > 0 &&
          findAllBrandInput.take < 100
            ? findAllBrandInput.take
            : 5,
        skip:
          findAllBrandInput &&
          findAllBrandInput.skip &&
          findAllBrandInput.skip > 0 &&
          findAllBrandInput.skip > 0
            ? findAllBrandInput.skip
            : 0,
        ...(findAllBrandInput?.id && { cursor: { id: findAllBrandInput?.id } }),
        orderBy: { createdAt: 'desc' },
      }),
    ])) ?? [0, []];
    return { total, items };
  }

  async findOne(findOneBrandInput: FindOneBrandInput) {
    return await this.prisma.brand.findFirst({
      where: { id: findOneBrandInput.id, name: findOneBrandInput.name },
    });
  }

  async update(updateBrandInput: UpdateBrandInput) {
    return await this.prisma.brand.update({
      where: { id: updateBrandInput.id },
      data: updateBrandInput,
    });
  }

  async remove(id: string) {
    return await this.prisma.brand.delete({
      where: { id },
    });
  }
}
