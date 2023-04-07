import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Address } from '../entities/address.entity';

@ObjectType()
export class FindAllAddressOutput {
  @Field(() => Int!) total: number;
  @Field(() => [Address]!) items: Address[];
  @Field(() => Int, { nullable: true, defaultValue: 10 }) take?: number;
  @Field(() => Int, { nullable: true, defaultValue: 0 }) skip?: number;
  @Field(() => String, { nullable: true }) cursor?: string;
  @Field(() => Int, { nullable: true }) cityId?: number;
  @Field(() => Int, { nullable: true }) stateId?: number;
}
