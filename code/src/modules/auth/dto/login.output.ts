import { Field, Float, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
export class LoginOutput {
  @ApiProperty() @Field(() => String) token: string;
  @ApiProperty() @Field(() => Float) expiration: number;
}
