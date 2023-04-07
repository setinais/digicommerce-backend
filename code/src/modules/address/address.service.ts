import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateAddressInput } from './dto/create-address.input';
import { FindAllAddressInput } from './dto/find-all-address.input';
import { UpdateAddressInput } from './dto/update-address.input';

@Injectable()
export class AddressService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAddressInput: CreateAddressInput) {
    return await this.prisma.address.create({
      data: createAddressInput,
    });
  }

  async findAll(findAllAddressInput: FindAllAddressInput) {
    const conditions = {
      where: {
        createdAt: findAllAddressInput.createdAt,
        updatedAt: findAllAddressInput.updatedAt,
        name: findAllAddressInput.name,
        cityId: findAllAddressInput.cityId,
        ...(findAllAddressInput.stateId && {
          City: { stateId: findAllAddressInput.stateId },
        }),
      },
    };
    const [total, items] = (await this.prisma.$transaction([
      this.prisma.address.count({
        ...conditions,
      }),
      this.prisma.address.findMany({
        ...conditions,
        take:
          findAllAddressInput &&
          findAllAddressInput.take &&
          findAllAddressInput.take > 0 &&
          findAllAddressInput.take < 100
            ? findAllAddressInput.take
            : 5,
        skip:
          findAllAddressInput &&
          findAllAddressInput.skip &&
          findAllAddressInput.skip > 0 &&
          findAllAddressInput.skip > 0
            ? findAllAddressInput.skip
            : 0,
        ...(findAllAddressInput?.id && {
          cursor: { id: findAllAddressInput?.id },
        }),
        orderBy: { createdAt: 'desc' },
      }),
    ])) ?? [0, []];
    return { total, items };
  }

  async findOne(id: string) {
    return await this.prisma.address.findFirst({
      where: { id },
    });
  }

  async update(updateAddressInput: UpdateAddressInput) {
    return await this.prisma.address.update({
      where: { id: updateAddressInput.id as string },
      data: updateAddressInput,
    });
  }

  async remove(id: string) {
    return await this.prisma.address.delete({
      where: { id },
    });
  }
}
