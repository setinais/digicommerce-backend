import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Measure {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
