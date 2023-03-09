import { Field, InputType, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UpdateProfileInput } from '../../profiles/dto/update-profile.input';

@InputType()
export class UpdateUserInput implements Prisma.UserUpdateInput {
  @Field(() => String, { nullable: false }) id: string;
  @Field(() => String, { nullable: true }) name?: string;
  @Field(() => String, { nullable: true }) email?: string;
  @Field(() => String, { nullable: true }) password?: string;
  @Field(() => Int, { nullable: true }) profileId?: number;
  @Field(() => UpdateProfileInput, { nullable: true }) profiles?: Prisma.ProfileUpdateOneWithoutUsersNestedInput;
}
