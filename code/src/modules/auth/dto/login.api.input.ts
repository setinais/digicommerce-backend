import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class LoginApiInput {
  @ApiProperty() @IsNotEmpty() @IsString() @Field(() => String) name: string;
  @ApiProperty() @IsNotEmpty() @Field(() => String) email: string;
}
