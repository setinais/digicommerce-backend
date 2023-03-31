import { Field, InputType, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class UpdateMeasureInput implements Prisma.MeasureUpdateInput {
  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
  id: number;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  name: string;
}
