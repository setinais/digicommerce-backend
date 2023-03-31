import { ObjectType, Field, Int } from '@nestjs/graphql';
import { State as PrismaState } from '@prisma/client';

@ObjectType()
export class State implements PrismaState {
  @Field(() => Int, { nullable: true }) id: number;
  @Field(() => Date, { nullable: true }) createdAt: Date;
  @Field(() => Date, { nullable: true }) updatedAt: Date;
  @Field(() => String, { nullable: true }) name: string;
  @Field(() => String, { nullable: true }) uf: string;
}
