import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Product as PrismaProduct } from '@prisma/client';
@ObjectType()
export class Product implements PrismaProduct {
  @Field(() => String, { nullable: true }) id: string;
  @Field(() => Date, { nullable: true }) createdAt: Date;
  @Field(() => Date, { nullable: true }) updatedAt: Date;
  @Field(() => String, { nullable: true }) description: string;
  @Field(() => String, { nullable: true }) name: string;
  @Field(() => String, { nullable: true }) picture: string;
  @Field(() => String, { nullable: true }) subCategoryId: string;
  @Field(() => String, { nullable: true }) brandId: string;
  @Field(() => Int, { nullable: true }) measureId: number;
}
