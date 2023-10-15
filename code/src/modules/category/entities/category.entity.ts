import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Category as PrismaCategory } from '@prisma/client';
@ObjectType()
export class Category implements PrismaCategory {
  @Field(() => String, { nullable: true }) id: string;
  @Field(() => Date, { nullable: true }) createdAt: Date;
  @Field(() => Date, { nullable: true }) updatedAt: Date;
  @Field(() => String, { nullable: true }) name: string;
}
