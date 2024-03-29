import { ObjectType, Field, Int } from '@nestjs/graphql';
import { City as PrismaCity } from '@prisma/client';
@ObjectType()
export class City implements PrismaCity {
  @Field(() => Int, { nullable: true }) id: number;
  @Field(() => Date, { nullable: true }) createdAt: Date;
  @Field(() => Date, { nullable: true }) updatedAt: Date;
  @Field(() => String, { nullable: true }) name: string;
  @Field(() => Int, { nullable: true }) stateId: number;
}
