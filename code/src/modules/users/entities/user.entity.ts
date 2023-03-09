import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Prisma, User as PrismaUser } from '@prisma/client';
import { Profile } from '../../profiles/entities/profile.entity';

@ObjectType()
export class User implements PrismaUser {
  @Field(() => String, { nullable: true }) id: string;
  @Field(() => String, { nullable: true }) name: string;
  @Field(() => String, { nullable: true }) email: string;
  @Field(() => String, { nullable: true }) password: string;
  @Field(() => Int, { nullable: true }) profileId: number;
  @Field(() => Boolean, { nullable: true }) status: boolean;
  @Field(() => Profile, { nullable: true }) profile?: Profile;
  @Field(() => Date, { nullable: true }) createdAt: Date;
  @Field(() => Date, { nullable: true }) updatedAt: Date;
}
