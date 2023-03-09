import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { LocalStrategy } from './local.strategy';
import { TokenService } from '../token/token.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let prisma: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthResolver, AuthService, LocalStrategy, PrismaService, TokenService, JwtService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    resolver = module.get<AuthResolver>(AuthResolver);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
