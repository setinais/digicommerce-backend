import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User as PrismaUser, ROLE } from '@prisma/client';

registerEnumType(ROLE, { name: 'Role' });

@ObjectType()
export class User {
  @Field(() => String, { nullable: true }) id: string;
  @Field(() => String, { nullable: true }) name: string;
  @Field(() => String, { nullable: true }) email: string;
  @Field(() => String, { nullable: true }) password: string;
  @Field(() => ROLE, { nullable: true }) role: ROLE;
  @Field(() => Boolean, { nullable: true }) active: boolean;
  @Field(() => Date, { nullable: true }) createdAt: Date;
  @Field(() => Date, { nullable: true }) updatedAt: Date;
}
