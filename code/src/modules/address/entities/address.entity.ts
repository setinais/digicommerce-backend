import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Address as PrismaAddress } from '@prisma/client';
import { City } from 'src/modules/city/entities/city.entity';
import { User } from 'src/modules/users/entities/user.entity';
@ObjectType()
export class Address implements PrismaAddress {
  @Field(() => String, { nullable: true }) id: string;
  @Field(() => Date, { nullable: true }) createdAt: Date;
  @Field(() => Date, { nullable: true }) updatedAt: Date;
  @Field(() => String, { nullable: true }) cep: string;
  @Field(() => Int, { nullable: true }) number: number;
  @Field(() => String, { nullable: true }) complement: string;
  @Field(() => String, { nullable: true }) address: string;
  @Field(() => String, { nullable: true }) neighborhood: string;
  @Field(() => Int, { nullable: true }) cityId: number;
  @Field(() => String, { nullable: true }) userId: string;
  @Field(() => User, { nullable: true }) User?: User;
  @Field(() => City, { nullable: true }) City?: City;
}
