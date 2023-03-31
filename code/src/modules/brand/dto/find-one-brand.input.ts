import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsUUID } from 'class-validator';

@InputType()
export class FindOneBrandInput {
  @IsOptional() @IsUUID(4) @Field(() => String) id?: string;
  @IsOptional() @Field(() => String) name?: string;
}

@InputType()
export class DeleteOneBrandInput {
  @IsOptional() @IsUUID(4) @Field(() => String) id: string;
}
