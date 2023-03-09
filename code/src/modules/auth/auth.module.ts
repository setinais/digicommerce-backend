import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { EnvironmentModule } from '../environment/environment.module';
import { AuthResolver } from './auth.resolver';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';

const { API_KEY, JWT_TOKEN_EXPIRE_IN_SEC } = EnvironmentModule.env;

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.register({
      secret: API_KEY,
      signOptions: { expiresIn: `${JWT_TOKEN_EXPIRE_IN_SEC}s` },
    }),
  ],
  providers: [AuthService, PrismaService, AuthResolver, JwtStrategy, LocalStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
