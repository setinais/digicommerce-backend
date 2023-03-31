import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateCategoryInput implements Prisma.CategoryCreateInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  name: string;
}
