import { InputType, Int, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import {
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class CreateAddressInput implements Prisma.AddressUncheckedCreateInput {
  @IsNotEmpty() @IsNumberString() @Field(() => String) cep: string;
  @IsNotEmpty() @IsInt() @Field(() => Int) number: number;
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  complement?: string;
  @IsNotEmpty() @IsString() @Field(() => String) address: string;
  @IsNotEmpty() @IsString() @Field(() => String) neighborhood: string;
  @IsNotEmpty() @IsInt() @Field(() => Int) cityId: number;
  @IsNotEmpty() @IsString() @Field(() => String) userId: string;
}
