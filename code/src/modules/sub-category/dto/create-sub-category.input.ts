import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateSubCategoryInput
  implements Prisma.SubCategoryUncheckedCreateInput
{
  @IsNotEmpty()
  @IsString()
  @IsUUID(4)
  @Field(() => String)
  categoryId: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  name: string;
}
