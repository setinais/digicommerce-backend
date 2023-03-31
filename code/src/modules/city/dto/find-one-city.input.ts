import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional, IsUUID } from 'class-validator';

@InputType()
export class FindOneCityInput {
  @IsOptional() @IsUUID(4) @Field(() => Int) id?: number;
  @IsOptional() @Field(() => String) name?: string;
}
