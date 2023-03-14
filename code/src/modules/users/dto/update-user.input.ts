import { Field, InputType, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@InputType()
export class UpdateUserInput implements Prisma.UserUpdateInput {
  @Field(() => String, { nullable: false }) id: string;
  @Field(() => String, { nullable: true }) name?: string;
  @Field(() => String, { nullable: true }) email?: string;
  @Field(() => String, { nullable: true }) password?: string;
}
