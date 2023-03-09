import { Field, InputType, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
// import { User } from '../../users/entities/user.entity';

@InputType()
export class CreateProfileInput implements Prisma.ProfileCreateInput {
  @Field(() => Int, { nullable: true }) id?: number;
  @Field(() => String) name: string;
  @Field(() => Date, { nullable: true }) createdAt?: string | Date;
  @Field(() => Date, { nullable: true }) updatedAt?: string | Date;
  // @Field(() => User, { nullable: true }) users?: Prisma.UserCreateNestedManyWithoutProfilesInput;
}
