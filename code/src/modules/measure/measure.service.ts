import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { FindAllMeasureInput } from './dto/find-all-measure.input';
import { FindOneMeasureInput } from './dto/find-one-measure.input';
import { UpdateMeasureInput } from './dto/update-measure.input';

@Injectable()
export class MeasureService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMeasureInput: Prisma.MeasureCreateInput) {
    return await this.prisma.measure.create({
      data: createMeasureInput,
    });
  }

  async findAll(findAllMeasureInput: FindAllMeasureInput) {
    const conditions = {
      where: {
        createdAt: findAllMeasureInput.createdAt,
        updatedAt: findAllMeasureInput.updatedAt,
        name: findAllMeasureInput.name,
      },
    };
    const [total, items] = (await this.prisma.$transaction([
      this.prisma.measure.count({
        ...conditions,
      }),
      this.prisma.measure.findMany({
        ...conditions,
        take:
          findAllMeasureInput &&
          findAllMeasureInput.take &&
          findAllMeasureInput.take > 0 &&
          findAllMeasureInput.take < 100
            ? findAllMeasureInput.take
            : 5,
        skip:
          findAllMeasureInput &&
          findAllMeasureInput.skip &&
          findAllMeasureInput.skip > 0 &&
          findAllMeasureInput.skip > 0
            ? findAllMeasureInput.skip
            : 0,
        ...(findAllMeasureInput?.id && {
          cursor: { id: findAllMeasureInput?.id },
        }),
        orderBy: { createdAt: 'desc' },
      }),
    ])) ?? [0, []];
    return { total, items };
  }

  async findOne(findOneMeasureInput: FindOneMeasureInput) {
    return await this.prisma.measure.findFirst({
      where: { id: findOneMeasureInput.id, name: findOneMeasureInput.name },
    });
  }

  async update(updateMeasureInput: UpdateMeasureInput) {
    return await this.prisma.measure.update({
      where: { id: updateMeasureInput.id },
      data: updateMeasureInput,
    });
  }

  async remove(id: number) {
    return await this.prisma.measure.delete({
      where: { id },
    });
  }
}
