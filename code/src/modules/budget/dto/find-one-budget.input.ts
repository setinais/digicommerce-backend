import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsOptional } from 'class-validator';

@InputType()
export class FindOneBudgetInput {
  @IsOptional() @IsInt() @Field(() => Int) id: number;
}
