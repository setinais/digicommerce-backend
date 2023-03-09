import { Field, InputType, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@InputType()
export class CreateUserInput implements Prisma.UserCreateInput {
  @Field(() => String, { nullable: true }) id?: string;
  @Field(() => String) name: string;
  @Field(() => String) email: string;
  @Field(() => String) password: string;
  @Field(() => Int, { defaultValue: 2 }) profileId: number;
  profiles?: Prisma.ProfileCreateNestedOneWithoutUsersInput;
}
