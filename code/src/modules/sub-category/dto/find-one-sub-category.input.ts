import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsUUID } from 'class-validator';

@InputType()
export class FindOneSubCategoryInput {
  @IsOptional() @IsUUID(4) @Field(() => String) id?: string;
  @IsOptional() @Field(() => String) name?: string;
}

@InputType()
export class DeleteOneSubCategoryInput {
  @IsOptional() @IsUUID(4) @Field(() => String) id: string;
}
