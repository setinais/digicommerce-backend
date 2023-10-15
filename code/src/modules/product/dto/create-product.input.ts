import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateProductInput implements Prisma.ProductUncheckedCreateInput {
  @IsNotEmpty() @IsString() @Field(() => String) description: string;
  @IsNotEmpty() @IsString() @Field(() => String) name: string;
  @IsNotEmpty() @IsUUID(4) @Field(() => String) subCategoryId: string;
  @IsNotEmpty() @IsUUID(4) @Field(() => String) brandId: string;
  @IsNotEmpty() @IsUUID(4) @Field(() => String) measureId: number;
}
