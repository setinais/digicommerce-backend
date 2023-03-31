import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BrandService } from './brand.service';
import { Brand } from './entities/brand.entity';
import { CreateBrandInput } from './dto/create-brand.input';
import { UpdateBrandInput } from './dto/update-brand.input';
import { FindAllBrandInput } from './dto/find-all-brand.input';
import { ExceptionsHandler } from 'src/core/exceptions/exceptions-handler';
import {
  DeleteOneBrandInput,
  FindOneBrandInput,
} from './dto/find-one-brand.input';
import { FindAllBrandOutput } from './dto/find-all-brand.output';

@Resolver(() => Brand)
export class BrandResolver extends ExceptionsHandler {
  constructor(private readonly brandService: BrandService) {
    super();
  }

  @Mutation(() => Brand)
  async createBrand(
    @Args('createBrandInput') createBrandInput: CreateBrandInput,
  ): Promise<Brand | undefined> {
    try {
      return await this.brandService.create(createBrandInput);
    } catch (error) {
      this.handleError(error);
    }
  }

  @Query(() => [Brand], { name: 'brands' })
  async findAll(
    @Args('findAllBrandInput') findAllBrandInput: FindAllBrandInput,
  ): Promise<FindAllBrandOutput | undefined> {
    try {
      const result = {
        ...(await this.brandService.findAll(findAllBrandInput)),
        take: findAllBrandInput.take,
        skip: findAllBrandInput.skip,
        cursor: findAllBrandInput.id,
      };
      return result;
    } catch (error) {
      this.handleError(error);
    }
  }

  @Query(() => Brand, { name: 'brand' })
  async asyncfindOne(
    @Args('FindOneBrandInput') findOneBrandInput: FindOneBrandInput,
  ): Promise<Brand | null | undefined> {
    try {
      return await this.brandService.findOne(findOneBrandInput);
    } catch (error) {
      this.handleError(error);
    }
  }

  @Mutation(() => Brand, { name: 'brandUpdate' })
  async updateBrand(
    @Args('updateBrandInput') updateBrandInput: UpdateBrandInput,
  ): Promise<Brand | undefined> {
    try {
      return await this.brandService.update(updateBrandInput);
    } catch (error) {
      this.handleError(error);
    }
  }

  @Mutation(() => Brand, { name: 'brandDelete' })
  async deleteBrand(
    @Args('deleteOneBrandInput') deleteOneBrandInput: DeleteOneBrandInput,
  ): Promise<Brand | undefined> {
    try {
      return await this.brandService.remove(deleteOneBrandInput.id);
    } catch (error) {
      this.handleError(error);
    }
  }
}
