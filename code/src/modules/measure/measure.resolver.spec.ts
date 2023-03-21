import { Test, TestingModule } from '@nestjs/testing';
import { MeasureResolver } from './measure.resolver';
import { MeasureService } from './measure.service';

describe('MeasureResolver', () => {
  let resolver: MeasureResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeasureResolver, MeasureService],
    }).compile();

    resolver = module.get<MeasureResolver>(MeasureResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
