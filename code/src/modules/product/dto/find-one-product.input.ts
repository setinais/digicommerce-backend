import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, IsUUID } from 'class-validator';

@InputType()
export class FindOneProductInput {
  @IsOptional() @IsUUID(4) @Field(() => String) id: string;
}
