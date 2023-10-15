import { Field, Int, ObjectType } from '@nestjs/graphql';
import { SubCategory } from '../entities/sub-category.entity';

@ObjectType()
export class FindAllSubCategoryOutput {
  @Field(() => Int!) total: number;
  @Field(() => [SubCategory]!) items: SubCategory[];
  @Field(() => Int, { nullable: true }) take?: number;
  @Field(() => Int, { nullable: true }) skip?: number;
  @Field(() => String, { nullable: true }) cursor?: string;
}
