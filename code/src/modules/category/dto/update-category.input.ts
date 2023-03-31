import { Prisma } from '@prisma/client';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID, IsString } from 'class-validator';

@InputType()
export class UpdateCategoryInput implements Prisma.CategoryUpdateInput {
  @IsNotEmpty()
  @IsUUID(4)
  @Field(() => String)
  id: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  name?: string;
}
