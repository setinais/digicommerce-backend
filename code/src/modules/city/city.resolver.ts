import { Args, Query, Resolver } from '@nestjs/graphql';
import { ExceptionsHandler } from 'src/core/exceptions/exceptions-handler';
import { CityService } from './city.service';
import { FindAllCityOutput } from './dto/find-all-city.output';
import { FindOneCityInput } from './dto/find-one-city.input';
import { City } from './entities/city.entity';
import { FindAllCityInput } from './dto/find-all-city.input';
import { State } from './entities/state.entity';
import { GqlAuthGuard } from 'src/guards/gql-auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';

@UseGuards(GqlAuthGuard)
@Resolver(() => City)
export class CityResolver extends ExceptionsHandler {
  constructor(private readonly cityService: CityService) {
    super();
  }

  @Query(() => FindAllCityOutput, { name: 'cities' })
  async findAll(
    @Args('findAllCityInput', { nullable: true })
    findAllCityInput: FindAllCityInput,
  ): Promise<FindAllCityOutput | undefined> {
    try {
      const result: FindAllCityOutput = {
        ...(await this.cityService.findAll(findAllCityInput)),
        take: findAllCityInput.take,
        skip: findAllCityInput.skip,
        cursor: findAllCityInput.id,
      };
      console.log(result);
      return result;
    } catch (error) {
      this.handleError(error);
    }
  }

  @Query(() => City, { name: 'city' })
  async findOne(
    @Args('FindOneCityInput') findOneCityInput: FindOneCityInput,
  ): Promise<City | null | undefined> {
    try {
      return await this.cityService.findOne(findOneCityInput);
    } catch (error) {
      this.handleError(error);
    }
  }

  @Query(() => [State], { name: 'states' })
  async findAllState(): Promise<State[] | null | undefined> {
    try {
      return await this.cityService.findAllState();
    } catch (error) {
      this.handleError(error);
    }
  }
}
