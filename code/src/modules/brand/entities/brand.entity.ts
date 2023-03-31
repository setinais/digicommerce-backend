import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Brand as PrismaBrand } from '@prisma/client';
@ObjectType()
export class Brand implements PrismaBrand {
  @Field(() => String, { nullable: true }) id: string;
  @Field(() => Date, { nullable: true }) createdAt: Date;
  @Field(() => Date, { nullable: true }) updatedAt: Date;
  @Field(() => String, { nullable: true }) name: string;
}
