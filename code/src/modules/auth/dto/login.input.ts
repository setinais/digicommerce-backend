import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class LoginInput {
  @ApiProperty() @IsNotEmpty() @IsEmail() @Field(() => String) idKey: string;
  @ApiProperty() @IsNotEmpty() @Field(() => String) secretKey: string;
}
