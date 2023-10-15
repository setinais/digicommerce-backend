import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateProductInput } from './dto/create-product.input';
import { FindAllProductInput } from './dto/find-all-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProductInput: CreateProductInput) {
    return 'This action adds a new product';
  }

  async findAll(findAllProductInput: FindAllProductInput) {
    const conditions = {
      where: {
        createdAt: findAllProductInput.createdAt,
        updatedAt: findAllProductInput.updatedAt,
        userId: findAllProductInput.userId,
        OR: [
          {
            ...(findAllProductInput.brands.length === 0 && {
              brandId: { in: findAllProductInput.brands },
            }),
            ...(findAllProductInput.categories.length === 0 && {
              subCategoryId: { in: findAllProductInput.categories },
            }),
          },
        ],
      },
    };
    const [total, items] = (await this.prisma.$transaction([
      this.prisma.product.count({
        ...conditions,
      }),
      this.prisma.product.findMany({
        ...conditions,
        take:
          findAllProductInput &&
          findAllProductInput.take &&
          findAllProductInput.take > 0 &&
          findAllProductInput.take < 100
            ? findAllProductInput.take
            : 5,
        skip:
          findAllProductInput &&
          findAllProductInput.skip &&
          findAllProductInput.skip > 0 &&
          findAllProductInput.skip > 0
            ? findAllProductInput.skip
            : 0,
        ...(findAllProductInput.id && {
          cursor: { id: findAllProductInput.id },
        }),
        orderBy: { createdAt: 'desc' },
      }),
    ])) ?? [0, []];
    return { total, items };
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  async update(updateProductInput: UpdateProductInput) {
    return `This action updates a # product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
