import { Field, ObjectType } from '@nestjs/graphql';
import { SubCategory as PrismaSubCategory } from '@prisma/client';

@ObjectType()
export class SubCategory implements PrismaSubCategory {
  @Field(() => String, { nullable: true }) id: string;
  @Field(() => Date, { nullable: true }) createdAt: Date;
  @Field(() => Date, { nullable: true }) updatedAt: Date;
  @Field(() => String, { nullable: true }) name: string;
  @Field(() => String, { nullable: true }) categoryId: string;
}
