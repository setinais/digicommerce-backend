import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let prisma: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersResolver, UsersService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    resolver = module.get<UsersResolver>(UsersResolver);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
