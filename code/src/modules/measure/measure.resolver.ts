import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MeasureService } from './measure.service';
import { Measure } from './entities/measure.entity';
import { CreateMeasureInput } from './dto/create-measure.input';
import { UpdateMeasureInput } from './dto/update-measure.input';

@Resolver(() => Measure)
export class MeasureResolver {
  constructor(private readonly measureService: MeasureService) {}

  @Mutation(() => Measure)
  createMeasure(@Args('createMeasureInput') createMeasureInput: CreateMeasureInput) {
    return this.measureService.create(createMeasureInput);
  }

  @Query(() => [Measure], { name: 'measure' })
  findAll() {
    return this.measureService.findAll();
  }

  @Query(() => Measure, { name: 'measure' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.measureService.findOne(id);
  }

  @Mutation(() => Measure)
  updateMeasure(@Args('updateMeasureInput') updateMeasureInput: UpdateMeasureInput) {
    return this.measureService.update(updateMeasureInput.id, updateMeasureInput);
  }

  @Mutation(() => Measure)
  removeMeasure(@Args('id', { type: () => Int }) id: number) {
    return this.measureService.remove(id);
  }
}
