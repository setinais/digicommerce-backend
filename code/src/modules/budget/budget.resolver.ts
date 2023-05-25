import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BudgetService } from './budget.service';
import { CreateBudgetInput } from './dto/create-budget.input';
import { FindAllBudgetInput } from './dto/find-all-budget.input';
import { FindAllBudgetOutput } from './dto/find-all-budget.output';
import { FindOneBudgetInput } from './dto/find-one-budget.input';
import { UpdateBudgetInput } from './dto/update-budget-input';
import { Budget } from './entities/budget.entity';

@Resolver(() => Budget)
export class BudgetResolver {
  constructor(private readonly budgetService: BudgetService) {}

  @Mutation(() => Budget)
  createBudget(
    @Args('createBudgetInput') createBudgetInput: CreateBudgetInput,
  ) {
    return this.budgetService.create(createBudgetInput);
  }

  @Query(() => FindAllBudgetOutput, { name: 'budget' })
  findAll(@Args('findAllBudgetInput') findAllBudgetInput: FindAllBudgetInput) {
    return this.budgetService.findAll(findAllBudgetInput);
  }

  @Query(() => Budget, { name: 'budget' })
  findOne(@Args('findOneBudgetInput') findOneBudgetInput: FindOneBudgetInput) {
    return this.budgetService.findOne(findOneBudgetInput.id);
  }

  @Mutation(() => Budget)
  updateBudget(
    @Args('updateBudgetInput') updateBudgetInput: UpdateBudgetInput,
  ) {
    return this.budgetService.update(updateBudgetInput);
  }

  @Mutation(() => Budget)
  removeBudget(
    @Args('deleteOneBudgetInput') findOneBudgetInput: FindOneBudgetInput,
  ) {
    return this.budgetService.remove(findOneBudgetInput.id);
  }
}
