import { Injectable, Module } from '@nestjs/common';
import { PrismaService } from '../../services/prisma/prisma.service';
import { UpdateUserInput } from './dto/update-user.input';
import { Prisma } from '@prisma/client';

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
    return await this.prisma.user.findFirst({
      where: {
        id,
      },
    });
  }

  /// This action updates a user
  async update(updateUserInput: UpdateUserInput) {
    return await this.prisma.user.update({
      data: {
        email: updateUserInput.email,
        password: updateUserInput.password,
        name: updateUserInput.name,
      },
      where: {
        id: updateUserInput.id,
      },
    });
  }

  /// This action removes a user
  async remove(id: string) {
    return await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
