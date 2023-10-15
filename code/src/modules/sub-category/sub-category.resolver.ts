import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SubCategoryService } from './sub-category.service';
import { SubCategory } from './entities/sub-category.entity';
import { CreateSubCategoryInput } from './dto/create-sub-category.input';
import { UpdateSubCategoryInput } from './dto/update-sub-category.input';
import { ExceptionsHandler } from 'src/core/exceptions/exceptions-handler';
import {
  DeleteOneSubCategoryInput,
  FindOneSubCategoryInput,
} from './dto/find-one-sub-category.input';
import { FindAllSubCategoryInput } from './dto/find-all-sub-category.input';
import { FindAllSubCategoryOutput } from './dto/find-all-sub-category.output';

@Resolver(() => SubCategory)
export class SubCategoryResolver extends ExceptionsHandler {
  constructor(private readonly subCategoryService: SubCategoryService) {
    super();
  }

  @Mutation(() => SubCategory)
  async createSubCategory(
    @Args('createCategoryInput') createCategoryInput: CreateSubCategoryInput,
  ): Promise<SubCategory | undefined> {
    try {
      return await this.subCategoryService.create(createCategoryInput);
    } catch (error) {
      this.handleError(error);
    }
  }

  @Query(() => [SubCategory], { name: 'subCategories' })
  async findAll(
    @Args('findAllCategoryInput') findAllCategoryInput: FindAllSubCategoryInput,
  ): Promise<FindAllSubCategoryOutput | undefined> {
    try {
      const result = {
        ...(await this.subCategoryService.findAll(findAllCategoryInput)),
        take: findAllCategoryInput.take,
        skip: findAllCategoryInput.skip,
        cursor: findAllCategoryInput.id,
      };
      return result;
    } catch (error) {
      this.handleError(error);
    }
  }

  @Query(() => SubCategory, { name: 'subCategory' })
  async findOne(
    @Args('FindOneCategoryInput') findOneCategoryInput: FindOneSubCategoryInput,
  ): Promise<SubCategory | null | undefined> {
    try {
      return await this.subCategoryService.findOne(findOneCategoryInput);
    } catch (error) {
      this.handleError(error);
    }
  }

  @Mutation(() => SubCategory, { name: 'subCategoryUpdate' })
  async updateSubCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateSubCategoryInput,
  ): Promise<SubCategory | undefined> {
    try {
      return await this.subCategoryService.update(updateCategoryInput);
    } catch (error) {
      this.handleError(error);
    }
  }

  @Mutation(() => SubCategory, { name: 'subCategoryDelete' })
  async deleteSubCategory(
    @Args('deleteOneCategoryInput')
    deleteOneCategoryInput: DeleteOneSubCategoryInput,
  ): Promise<SubCategory | undefined> {
    try {
      return await this.subCategoryService.remove(deleteOneCategoryInput.id);
    } catch (error) {
      this.handleError(error);
    }
  }
}
