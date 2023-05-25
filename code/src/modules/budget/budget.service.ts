import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { FindAllBudgetInput } from './dto/find-all-budget.input';
import { UpdateBudgetInput } from './dto/update-budget-input';
import { CreateBudgetInput } from './dto/create-budget.input';

@Injectable()
export class BudgetService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBudgetInput: CreateBudgetInput) {
    return await this.prisma.budget.create({
      data: createBudgetInput,
    });
  }

  async findAll(findAllBudgetInput: FindAllBudgetInput) {
    const conditions = {
      where: {
        createdAt: findAllBudgetInput.createdAt,
        updatedAt: findAllBudgetInput.updatedAt,
        userId: findAllBudgetInput.userId,
      },
    };
    const [total, items] = (await this.prisma.$transaction([
      this.prisma.budget.count({
        ...conditions,
      }),
      this.prisma.budget.findMany({
        ...conditions,
        take:
          findAllBudgetInput &&
          findAllBudgetInput.take &&
          findAllBudgetInput.take > 0 &&
          findAllBudgetInput.take < 100
            ? findAllBudgetInput.take
            : 5,
        skip:
          findAllBudgetInput &&
          findAllBudgetInput.skip &&
          findAllBudgetInput.skip > 0 &&
          findAllBudgetInput.skip > 0
            ? findAllBudgetInput.skip
            : 0,
        ...(findAllBudgetInput.id && {
          cursor: { id: findAllBudgetInput.id },
        }),
        orderBy: { createdAt: 'desc' },
      }),
    ])) ?? [0, []];
    return { total, items };
  }

  async findOne(id: number) {
    return await this.prisma.budget.findUnique({
      where: { id },
    });
  }

  async update(updateBudgetInput: UpdateBudgetInput) {
    return await this.prisma.budget.update({
      where: { id: updateBudgetInput.id },
      data: updateBudgetInput,
    });
  }

  async remove(id: number) {
    return await this.prisma.budget.delete({
      where: { id },
    });
  }
}
