import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional, IsUUID, IsNumber, IsNotEmpty } from 'class-validator';

@InputType()
export class FindOneMeasureInput {
  @IsOptional() @IsNumber() @Field(() => Int) id?: number;
  @IsOptional() @Field(() => String) name?: string;
}

@InputType()
export class DeleteOneMeasureInput {
  @IsNotEmpty() @IsNumber() @Field(() => Int) id: number;
}
