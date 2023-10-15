import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class UpdateSubCategoryInput implements Prisma.SubCategoryUpdateInput {
  @IsNotEmpty()
  @IsUUID(4)
  @Field(() => String)
  id: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  name?: string;
}
