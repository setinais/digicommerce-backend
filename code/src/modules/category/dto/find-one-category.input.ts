import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsUUID } from 'class-validator';

@InputType()
export class FindOneCategoryInput {
  @IsOptional() @IsUUID(4) @Field(() => String) id?: string;
  @IsOptional() @Field(() => String) name?: string;
}

@InputType()
export class DeleteOneCategoryInput {
  @IsOptional() @IsUUID(4) @Field(() => String) id: string;
}
