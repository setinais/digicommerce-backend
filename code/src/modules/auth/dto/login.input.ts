import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class LoginInput {
  @ApiProperty() @IsUUID(4) @Field(() => String) idKey: string;
  @ApiProperty() @IsNotEmpty() @Field(() => String) secretKey: string;
}
