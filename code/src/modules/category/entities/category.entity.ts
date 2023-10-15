import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Category as PrismaCategory } from '@prisma/client';
import { SubCategory } from 'src/modules/sub-category/entities/sub-category.entity';
@ObjectType()
export class Category implements PrismaCategory {
  @Field(() => String, { nullable: true }) id: string;
  @Field(() => Date, { nullable: true }) createdAt: Date;
  @Field(() => Date, { nullable: true }) updatedAt: Date;
  @Field(() => String, { nullable: true }) name: string;
  @Field(() => [SubCategory], { nullable: true }) SubCategories?: SubCategory[];
}
