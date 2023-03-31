import { Field, InputType, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class FindAllMeasureInput {
  @IsOptional() @IsNumber() @Field(() => Int, { nullable: true }) id?: number;

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
  @IsString()
  @Type(() => String)
  @Field(() => String, { nullable: true })
  name?: string;
}
