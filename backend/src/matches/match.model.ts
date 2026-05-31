import { ObjectType, Field, ID, Float, registerEnumType } from '@nestjs/graphql';
import { Team } from '../teams/team.model';

export enum MatchStatus {
  SCHEDULED = 'SCHEDULED',
  LIVE = 'LIVE',
  COMPLETED = 'COMPLETED',
  ABANDONED = 'ABANDONED',
}

registerEnumType(MatchStatus, { name: 'MatchStatus' });

@ObjectType()
export class Match {
  @Field(() => ID)
  id: string;

  @Field()
  season: number;

  @Field()
  matchNumber: number;

  @Field()
  date: Date;

  @Field()
  venue: string;

  @Field()
  city: string;

  @Field()
  team1Id: string;

  @Field()
  team2Id: string;

  @Field(() => Team, { nullable: true })
  team1?: Team;

  @Field(() => Team, { nullable: true })
  team2?: Team;

  @Field({ nullable: true })
  tossWinnerId?: string;

  @Field({ nullable: true })
  tossDecision?: string;

  @Field({ nullable: true })
  winnerId?: string;

  @Field(() => MatchStatus)
  status: MatchStatus;

  @Field(() => Float, { nullable: true })
  team1Score?: number;

  @Field(() => Float, { nullable: true })
  team1Wickets?: number;

  @Field(() => Float, { nullable: true })
  team1Overs?: number;

  @Field(() => Float, { nullable: true })
  team2Score?: number;

  @Field(() => Float, { nullable: true })
  team2Wickets?: number;

  @Field(() => Float, { nullable: true })
  team2Overs?: number;

  @Field({ nullable: true })
  playerOfMatch?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
