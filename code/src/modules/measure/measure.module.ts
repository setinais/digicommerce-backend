import { Module } from '@nestjs/common';
import { MeasureService } from './measure.service';
import { MeasureResolver } from './measure.resolver';
import { PrismaModule } from 'src/services/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [MeasureResolver, MeasureService],
})
export class MeasureModule {}
