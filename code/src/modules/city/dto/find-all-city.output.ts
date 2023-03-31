import { Field, Int, ObjectType } from '@nestjs/graphql';
import { City } from '../entities/city.entity';

@ObjectType()
export class FindAllCityOutput {
  @Field(() => Int!) total: number;
  @Field(() => [City]!) items: City[];
  @Field(() => Int, { nullable: true }) take?: number;
  @Field(() => Int, { nullable: true }) skip?: number;
  @Field(() => Int, { nullable: true }) cursor?: number;
}
