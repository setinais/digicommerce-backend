import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { FindAllCityInput } from './dto/find-all-city.input';
import { FindOneCityInput } from './dto/find-one-city.input';

@Injectable()
export class CityService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(findAllCityInput: FindAllCityInput) {
    const conditions = {
      where: {
        createdAt: findAllCityInput.createdAt,
        updatedAt: findAllCityInput.updatedAt,
        name: findAllCityInput.name,
        stateId: findAllCityInput.stateId,
      },
    };
    const [total, items] = (await this.prisma.$transaction([
      this.prisma.city.count({
        ...conditions,
      }),
      this.prisma.city.findMany({
        ...conditions,
        take:
          findAllCityInput &&
          findAllCityInput.take &&
          findAllCityInput.take > 0 &&
          findAllCityInput.take < 100
            ? findAllCityInput.take
            : 5,
        skip:
          findAllCityInput &&
          findAllCityInput.skip &&
          findAllCityInput.skip > 0 &&
          findAllCityInput.skip > 0
            ? findAllCityInput.skip
            : 0,
        ...(findAllCityInput?.id && {
          cursor: { id: findAllCityInput?.id },
        }),
        orderBy: { createdAt: 'desc' },
      }),
    ])) ?? [0, []];
    return { total, items };
  }

  async findOne(findOneCityInput: FindOneCityInput) {
    return await this.prisma.city.findFirst({
      where: { id: findOneCityInput.id, name: findOneCityInput.name },
    });
  }

  async findAllState() {
    return await this.prisma.state.findMany();
  }
}
