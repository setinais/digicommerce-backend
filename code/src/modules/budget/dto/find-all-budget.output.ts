import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Budget } from '../entities/budget.entity';

@ObjectType()
export class FindAllBudgetOutput {
  @Field(() => Int!) total: number;
  @Field(() => [Budget]!) items: Budget[];
  @Field(() => Int, { nullable: true }) take?: number;
  @Field(() => Int, { nullable: true }) skip?: number;
  @Field(() => String, { nullable: true }) cursor?: string;
}
