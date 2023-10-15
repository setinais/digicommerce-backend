import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from '../entities/product.entity';

@ObjectType()
export class FindAllProductOutput {
  @Field(() => Int!) total: number;
  @Field(() => [Product]!) items: Product[];
  @Field(() => Int, { nullable: true }) take?: number;
  @Field(() => Int, { nullable: true }) skip?: number;
  @Field(() => String, { nullable: true }) cursor?: string;
}
