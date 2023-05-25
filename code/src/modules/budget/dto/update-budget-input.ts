import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class UpdateBudgetInput implements Prisma.BudgetUncheckedUpdateInput {
  @IsNotEmpty()
  @IsInt()
  @Field(() => Int)
  id: number;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  observation?: string;

  @IsOptional()
  @IsNumber()
  @Field(() => Float)
  discount?: number;

  @IsOptional()
  @IsNumber()
  @Field(() => Float)
  grossValue?: number;

  @IsOptional()
  @IsNumber()
  @Field(() => Float)
  netValue?: number;
}
