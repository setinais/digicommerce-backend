import { Module } from '@nestjs/common';
import { PrismaService } from '../../services/prisma/prisma.service';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/services/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
