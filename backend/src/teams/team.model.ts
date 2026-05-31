import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class Team {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  shortName: string;

  @Field({ nullable: true })
  logoUrl?: string;

  @Field()
  primaryColor: string;

  @Field()
  secondaryColor: string;

  @Field({ nullable: true })
  homeVenue?: string;

  @Field(() => Float, { nullable: true })
  overallRating?: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
