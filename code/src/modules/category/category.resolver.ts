import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { ExceptionsHandler } from 'src/core/exceptions/exceptions-handler';
import { CreateCategoryInput } from './dto/create-category.input';
import { FindAllCategoryInput } from './dto/find-all-category.input';
import { FindAllCategoryOutput } from './dto/find-all-category.output';
import {
  FindOneCategoryInput,
  DeleteOneCategoryInput,
} from './dto/find-one-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';

@Resolver(() => Category)
export class CategoryResolver extends ExceptionsHandler {
  constructor(private readonly categoryService: CategoryService) {
    super();
  }

  @Mutation(() => Category)
  async createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ): Promise<Category | undefined> {
    try {
      return await this.categoryService.create(createCategoryInput);
    } catch (error) {
      this.handleError(error);
    }
  }

  @Query(() => [Category], { name: 'categorys' })
  async findAll(
    @Args('findAllCategoryInput') findAllCategoryInput: FindAllCategoryInput,
  ): Promise<FindAllCategoryOutput | undefined> {
    try {
      const result = {
        ...(await this.categoryService.findAll(findAllCategoryInput)),
        take: findAllCategoryInput.take,
        skip: findAllCategoryInput.skip,
        cursor: findAllCategoryInput.id,
      };
      return result;
    } catch (error) {
      this.handleError(error);
    }
  }

  @Query(() => Category, { name: 'category' })
  async asyncfindOne(
    @Args('FindOneCategoryInput') findOneCategoryInput: FindOneCategoryInput,
  ): Promise<Category | null | undefined> {
    try {
      return await this.categoryService.findOne(findOneCategoryInput);
    } catch (error) {
      this.handleError(error);
    }
  }

  @Mutation(() => Category, { name: 'categoryUpdate' })
  async updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ): Promise<Category | undefined> {
    try {
      return await this.categoryService.update(updateCategoryInput);
    } catch (error) {
      this.handleError(error);
    }
  }

  @Mutation(() => Category, { name: 'categoryDelete' })
  async deleteCategory(
    @Args('deleteOneCategoryInput')
    deleteOneCategoryInput: DeleteOneCategoryInput,
  ): Promise<Category | undefined> {
    try {
      return await this.categoryService.remove(deleteOneCategoryInput.id);
    } catch (error) {
      this.handleError(error);
    }
  }
}
