import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Budget as PrismaBudget } from '@prisma/client';
@ObjectType()
export class Budget implements PrismaBudget {
  @Field(() => Int, { nullable: true }) id: number;
  @Field(() => Date, { nullable: true }) createdAt: Date;
  @Field(() => Date, { nullable: true }) updatedAt: Date;
  @Field(() => String, { nullable: true }) userId: string;
  @Field(() => String, { nullable: true }) observation: string | null;
  @Field(() => Float, { nullable: true }) discount: number;
  @Field(() => Date, { nullable: true }) validate: Date;
  @Field(() => Float, { nullable: true }) grossValue: number;
  @Field(() => Float, { nullable: true }) netValue: number;
}
