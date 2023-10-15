import { Args, Query, Resolver } from '@nestjs/graphql';
import { ExceptionsHandler } from 'src/core/exceptions/exceptions-handler';
import { CityService } from './city.service';
import { FindAllCityOutput } from './dto/find-all-city.output';
import { FindOneCityInput } from './dto/find-one-city.input';
import { City } from './entities/city.entity';
import { FindAllCityInput } from './dto/find-all-city.input';
import { State } from './entities/state.entity';

@Resolver(() => City)
export class CityResolver extends ExceptionsHandler {
  constructor(private readonly cityService: CityService) {
    super();
  }

  @Query(() => [City], { name: 'cities' })
  async findAll(
    @Args('findAllCityInput') findAllCityInput: FindAllCityInput,
  ): Promise<FindAllCityOutput | undefined> {
    try {
      const result = {
        ...(await this.cityService.findAll(findAllCityInput)),
        take: findAllCityInput.take,
        skip: findAllCityInput.skip,
        cursor: findAllCityInput.id,
      };
      return result;
    } catch (error) {
      this.handleError(error);
    }
  }

  @Query(() => City, { name: 'city' })
  async asyncfindOne(
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
