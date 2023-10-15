import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { FindAllCategoryInput } from './dto/find-all-category.input';
import { FindOneCategoryInput } from './dto/find-one-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryInput: Prisma.CategoryCreateInput) {
    return await this.prisma.category.create({
      data: createCategoryInput,
    });
  }

  async findAll(findAllCategoryInput: FindAllCategoryInput) {
    const conditions = {
      where: {
        createdAt: findAllCategoryInput.createdAt,
        updatedAt: findAllCategoryInput.updatedAt,
        name: findAllCategoryInput.name,
      },
    };
    const [total, items] = (await this.prisma.$transaction([
      this.prisma.category.count({
        ...conditions,
      }),
      this.prisma.category.findMany({
        ...conditions,
        take:
          findAllCategoryInput &&
          findAllCategoryInput.take &&
          findAllCategoryInput.take > 0 &&
          findAllCategoryInput.take < 100
            ? findAllCategoryInput.take
            : 5,
        skip:
          findAllCategoryInput &&
          findAllCategoryInput.skip &&
          findAllCategoryInput.skip > 0 &&
          findAllCategoryInput.skip > 0
            ? findAllCategoryInput.skip
            : 0,
        ...(findAllCategoryInput?.id && {
          cursor: { id: findAllCategoryInput?.id },
        }),
        include: { SubCategories: true },
        orderBy: { createdAt: 'desc' },
      }),
    ])) ?? [0, []];
    return { total, items };
  }

  async findOne(findOneCategoryInput: FindOneCategoryInput) {
    return await this.prisma.category.findFirst({
      where: { id: findOneCategoryInput.id, name: findOneCategoryInput.name },
    });
  }

  async update(updateCategoryInput: UpdateCategoryInput) {
    return await this.prisma.category.update({
      where: { id: updateCategoryInput.id },
      data: updateCategoryInput,
    });
  }

  async remove(id: string) {
    return await this.prisma.category.delete({
      where: { id },
    });
  }
}
