import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { FindAllSubCategoryInput } from './dto/find-all-sub-category.input';
import { FindOneSubCategoryInput } from './dto/find-one-sub-category.input';
import { UpdateSubCategoryInput } from './dto/update-sub-category.input';

@Injectable()
export class SubCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSubCategoryInput: Prisma.SubCategoryUncheckedCreateInput) {
    return await this.prisma.subCategory.create({
      data: createSubCategoryInput,
    });
  }

  async findAll(findAllSubCategoryInput: FindAllSubCategoryInput) {
    const conditions = {
      where: {
        createdAt: findAllSubCategoryInput.createdAt,
        updatedAt: findAllSubCategoryInput.updatedAt,
        name: findAllSubCategoryInput.name,
      },
    };
    const [total, items] = (await this.prisma.$transaction([
      this.prisma.subCategory.count({
        ...conditions,
      }),
      this.prisma.subCategory.findMany({
        ...conditions,
        take:
          findAllSubCategoryInput &&
          findAllSubCategoryInput.take &&
          findAllSubCategoryInput.take > 0 &&
          findAllSubCategoryInput.take < 100
            ? findAllSubCategoryInput.take
            : 5,
        skip:
          findAllSubCategoryInput &&
          findAllSubCategoryInput.skip &&
          findAllSubCategoryInput.skip > 0 &&
          findAllSubCategoryInput.skip > 0
            ? findAllSubCategoryInput.skip
            : 0,
        ...(findAllSubCategoryInput?.id && {
          cursor: { id: findAllSubCategoryInput?.id },
        }),
        orderBy: { createdAt: 'desc' },
      }),
    ])) ?? [0, []];
    return { total, items };
  }

  async findOne(findOneSubCategoryInput: FindOneSubCategoryInput) {
    return await this.prisma.subCategory.findFirst({
      where: {
        id: findOneSubCategoryInput.id,
        name: findOneSubCategoryInput.name,
      },
    });
  }

  async update(updateSubCategoryInput: UpdateSubCategoryInput) {
    return await this.prisma.subCategory.update({
      where: { id: updateSubCategoryInput.id },
      data: updateSubCategoryInput,
    });
  }

  async remove(id: string) {
    return await this.prisma.subCategory.delete({
      where: { id },
    });
  }
}
