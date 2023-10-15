import { Module } from '@nestjs/common';
import { MeasureService } from './measure.service';
import { MeasureResolver } from './measure.resolver';

@Module({
  providers: [MeasureResolver, MeasureService],
})
export class MeasureModule {}
