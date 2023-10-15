import { Field, InputType, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
} from 'class-validator';

@InputType()
export class UpdateProductInput implements Prisma.ProductUncheckedUpdateInput {
  @IsNotEmpty() @IsUUID(4) @Field(() => String) id: string;
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  description?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  name?: string;

  @IsOptional()
  @IsUrl()
  @Field(() => String, { nullable: true })
  picture?: string;

  @IsOptional()
  @IsUUID(4)
  @Field(() => String, { nullable: true })
  subCategoryId?: string;

  @IsOptional()
  @IsUUID(4)
  @Field(() => String, { nullable: true })
  brandId?: string;

  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  measureId?: number;
}
