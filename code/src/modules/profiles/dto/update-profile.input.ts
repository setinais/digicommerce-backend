import { Field, InputType, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
// import { User } from '../../users/entities/user.entity';

@InputType()
export class UpdateProfileInput implements Prisma.ProfileUpdateInput {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => String, { nullable: true }) name?: string;
  @Field(() => Date, { nullable: true }) createdAt?: Date;
  @Field(() => Date, { nullable: true }) updatedAt?: Date;
  // @Field(() => User, { nullable: true }) users?: Prisma.UserCreateNestedManyWithoutProfilesInput;
}
