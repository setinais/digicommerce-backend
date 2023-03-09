import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Profile as PrismaProfile } from '@prisma/client';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class Profile implements PrismaProfile {
  @Field(() => Int, { nullable: true }) id: number;
  @Field(() => String, { nullable: true }) name: string;
  @Field(() => Date, { nullable: true }) createdAt: Date;
  @Field(() => Date, { nullable: true }) updatedAt: Date;
  @Field(() => User, { nullable: true }) users?: User;
}
