import { Injectable, Logger, Module } from '@nestjs/common';
import { PrismaService } from '../../services/prisma/prisma.service';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';

@Module({
  imports: [PrismaService],
})
@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  /// This action adds a new profile
  async create(createProfileInput: CreateProfileInput) {
    return await this.prisma.profile.create({
      data: { ...createProfileInput },
    });
  }

  /// This action returns all profiles
  async findAll() {
    return await this.prisma.profile.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  /// This action returns all profiles with inner users paginated
  async findAllProfilesWithUsersPaginated() {
    const [total, profiles] = await this.prisma.$transaction(
      [
        this.prisma.profile.count(),
        this.prisma.profile.findMany({
          include: {
            users: {
              select: {
                id: true,
              },
              take: 5,
              orderBy: {
                name: 'asc',
              },
            },
          },
        }),
      ],
      { isolationLevel: 'ReadCommitted' },
    );
    return { total, profiles };
  }

  /// This action returns a #${id} profile
  async findOne(id: number) {
    return await this.prisma.profile.findFirst({
      where: {
        id,
      },
    });
  }

  /// This action updates a #${id} profile
  async update(id: number, updateProfileInput: UpdateProfileInput) {
    return await this.prisma.profile.update({
      data: {
        ...updateProfileInput,
      },
      where: {
        id: id,
      },
    });
  }

  /// This action removes a #${id} profile
  async remove(id: number) {
    return await this.prisma.profile.delete({
      where: {
        id,
      },
    });
  }

  /// This action updates or create a #${id} profile
  async upsert(updateProfileInput: UpdateProfileInput) {
    return await this.prisma.profile.upsert({
      create: {
        id: updateProfileInput.id,
        name: updateProfileInput.name,
      },
      update: {
        id: updateProfileInput.id,
        name: updateProfileInput.name,
      },
      where: {
        id: updateProfileInput.id,
      },
    });
  }
}
