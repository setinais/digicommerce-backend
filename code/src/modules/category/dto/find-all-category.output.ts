import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Category } from '../entities/category.entity';

@ObjectType()
export class FindAllCategoryOutput {
  @Field(() => Int!) total: number;
  @Field(() => [Category]!) items: Category[];
  @Field(() => Int, { nullable: true }) take?: number;
  @Field(() => Int, { nullable: true }) skip?: number;
  @Field(() => String, { nullable: true }) cursor?: string;
}
