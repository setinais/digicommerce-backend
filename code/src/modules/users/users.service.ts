import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../services/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  /// This action add a new user
  async create(createUserInput: Prisma.UserCreateInput) {
    return await this.prisma.user.create({
      data: createUserInput,
    });
  }

  /// This action returns all users
  async findAll() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        password: false,
        createdAt: true,
      },
    });
  }

  /// This action returns a user
  async findOne(id: string) {
    return await this.prisma.user.findFirst({ where: { id } });
  }

  /// This action updates a user
  async update(updateUserInput: Prisma.UserUpdateInput) {
    return await this.prisma.user.update({
      data: updateUserInput,
      where: {
        id: updateUserInput.id as string,
      },
    });
  }

  /// This action removes a user
  async remove(id: string) {
    return await this.prisma.user.delete({ where: { id: id } });
  }
}
