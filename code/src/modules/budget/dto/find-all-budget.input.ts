import { Field, InputType, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsUUID,
  IsString,
} from 'class-validator';

@InputType()
export class FindAllBudgetInput {
  @IsOptional() @IsInt() @Field(() => Int, { nullable: true }) id?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Field(() => Int, { nullable: true })
  take?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Field(() => Int, { nullable: true })
  skip?: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @IsOptional()
  @IsUUID(4)
  @Type(() => String)
  @Field(() => String, { nullable: true })
  userId?: string;
}
