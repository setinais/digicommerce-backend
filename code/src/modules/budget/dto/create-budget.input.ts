import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';

@InputType()
export class CreateBudgetInput implements Prisma.BudgetUncheckedCreateInput {
  @IsNotEmpty() @IsUUID(4) @Field(() => String) userId: string;
  @IsNotEmpty() @Field(() => String) observation?: string;
  @IsNotEmpty() @IsNumber() @Field(() => Float) discount?: number;
  @IsNotEmpty() @IsDate() @Field(() => Int) validate: Date;
  @IsNotEmpty() @IsNumber() @Field(() => Float) grossValue?: number;
  @IsNotEmpty() @IsNumber() @Field(() => Float) netValue?: number;
  @IsNotEmpty() @IsNumberString() @Field(() => String) cep: string;
  @IsNotEmpty() @IsInt() @Field(() => Int) number: number;

  @IsNotEmpty()
  @Type(() => CreateProductOnBudgetInput)
  @ValidateNested({ each: true })
  @Field(() => [CreateProductOnBudgetInput])
  products: CreateProductOnBudgetInput[];
}

@InputType()
export class CreateProductOnBudgetInput
  implements Prisma.ProductOnBudgetUncheckedCreateWithoutBudgetInput
{
  @IsNotEmpty() @IsUUID(4) @Field(() => String) productId: string;
  @IsOptional() @Field(() => Float) pricer?: number;
  @IsNotEmpty() @Min(0.1) @Field(() => Int) qntd: number;
}
