import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User as PrismaUser, ROLE } from '@prisma/client';

@ObjectType()
export class User {
  @Field(() => String, { nullable: true }) id: string;
  @Field(() => String, { nullable: true }) name: string;
  @Field(() => String, { nullable: true }) email: string;
  @Field(() => String, { nullable: true }) password: string;
  @Field(() => ROLE, { nullable: true }) role: ROLE;
  @Field(() => Boolean, { nullable: true }) status: boolean;
  @Field(() => Date, { nullable: true }) createdAt: Date;
  @Field(() => Date, { nullable: true }) updatedAt: Date;
}
