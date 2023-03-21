import { Field, InputType, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsUUID } from 'class-validator';

@InputType()
export class FindAllBrandInput {
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
}
