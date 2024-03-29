import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsUUID } from 'class-validator';

@InputType()
export class FindOneAddressInput {
  @IsOptional() @IsUUID(4) @Field(() => String) id: string;
}
