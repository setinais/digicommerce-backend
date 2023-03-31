import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Measure as PrismaMeasure } from '@prisma/client';
@ObjectType()
export class Measure implements PrismaMeasure {
  @Field(() => Int, { nullable: true }) id: number;
  @Field(() => Date, { nullable: true }) createdAt: Date;
  @Field(() => Date, { nullable: true }) updatedAt: Date;
  @Field(() => String, { nullable: true }) name: string;
}
