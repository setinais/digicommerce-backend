import { ExceptionsHandler } from 'src/core/exceptions/exceptions-handler';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateMeasureInput } from './dto/create-measure.input';
import { FindAllMeasureInput } from './dto/find-all-measure.input';
import { FindAllMeasureOutput } from './dto/find-all-measure.output';
import {
  DeleteOneMeasureInput,
  FindOneMeasureInput,
} from './dto/find-one-measure.input';
import { UpdateMeasureInput } from './dto/update-measure.input';
import { Measure } from './entities/measure.entity';
import { MeasureService } from './measure.service';

@Resolver(() => Measure)
export class MeasureResolver extends ExceptionsHandler {
  constructor(private readonly measureService: MeasureService) {
    super();
  }

  @Mutation(() => Measure)
  async createMeasure(
    @Args('createMeasureInput') createMeasureInput: CreateMeasureInput,
  ): Promise<Measure | undefined> {
    try {
      return await this.measureService.create(createMeasureInput);
    } catch (error) {
      this.handleError(error);
    }
  }

  @Query(() => [Measure], { name: 'measures' })
  async findAll(
    @Args('findAllMeasureInput') findAllMeasureInput: FindAllMeasureInput,
  ): Promise<FindAllMeasureOutput | undefined> {
    try {
      const result = {
        ...(await this.measureService.findAll(findAllMeasureInput)),
        take: findAllMeasureInput.take,
        skip: findAllMeasureInput.skip,
        cursor: findAllMeasureInput.id,
      };
      return result;
    } catch (error) {
      this.handleError(error);
    }
  }

  @Query(() => Measure, { name: 'measure' })
  async asyncfindOne(
    @Args('FindOneMeasureInput') findOneMeasureInput: FindOneMeasureInput,
  ): Promise<Measure | null | undefined> {
    try {
      return await this.measureService.findOne(findOneMeasureInput);
    } catch (error) {
      this.handleError(error);
    }
  }

  @Mutation(() => Measure, { name: 'measureUpdate' })
  async updateMeasure(
    @Args('updateMeasureInput') updateMeasureInput: UpdateMeasureInput,
  ): Promise<Measure | undefined> {
    try {
      return await this.measureService.update(updateMeasureInput);
    } catch (error) {
      this.handleError(error);
    }
  }

  @Mutation(() => Measure, { name: 'measureDelete' })
  async deleteMeasure(
    @Args('deleteOneMeasureInput')
    deleteOneMeasureInput: DeleteOneMeasureInput,
  ): Promise<Measure | undefined> {
    try {
      return await this.measureService.remove(deleteOneMeasureInput.id);
    } catch (error) {
      this.handleError(error);
    }
  }
}
