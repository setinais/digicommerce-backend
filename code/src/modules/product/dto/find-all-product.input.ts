import { Field, InputType, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

@InputType()
export class FindAllProductInput {
  @IsOptional() @IsUUID(4) @Field(() => String, { nullable: true }) id?: string;

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

  @IsOptional()
  @IsUUID(4, { each: true })
  @Field(() => [String], { nullable: true, defaultValue: [] })
  categories: string[];

  @IsOptional()
  @IsUUID(4, { each: true })
  @Field(() => [String], { nullable: true, defaultValue: [] })
  brands: string[];

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  search?: string;
}
