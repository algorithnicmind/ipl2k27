import { ObjectType, Field, ID, Float, registerEnumType } from '@nestjs/graphql';

export enum PlayerRole {
  BATTER = 'BATTER',
  BOWLER = 'BOWLER',
  ALL_ROUNDER = 'ALL_ROUNDER',
  WICKET_KEEPER = 'WICKET_KEEPER',
}

export enum BattingStyle {
  RIGHT_HAND = 'RIGHT_HAND',
  LEFT_HAND = 'LEFT_HAND',
}

export enum BowlingStyle {
  RIGHT_ARM_FAST = 'RIGHT_ARM_FAST',
  LEFT_ARM_FAST = 'LEFT_ARM_FAST',
  RIGHT_ARM_MEDIUM = 'RIGHT_ARM_MEDIUM',
  LEFT_ARM_MEDIUM = 'LEFT_ARM_MEDIUM',
  RIGHT_ARM_SPIN = 'RIGHT_ARM_SPIN',
  LEFT_ARM_SPIN = 'LEFT_ARM_SPIN',
  NONE = 'NONE',
}

registerEnumType(PlayerRole, { name: 'PlayerRole' });
registerEnumType(BattingStyle, { name: 'BattingStyle' });
registerEnumType(BowlingStyle, { name: 'BowlingStyle' });

@ObjectType()
export class Player {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => PlayerRole)
  role: PlayerRole;

  @Field(() => BattingStyle)
  battingStyle: BattingStyle;

  @Field(() => BowlingStyle)
  bowlingStyle: BowlingStyle;

  @Field({ nullable: true })
  nationality?: string;

  @Field({ nullable: true })
  teamId?: string;

  @Field(() => Float, { nullable: true })
  overallRating?: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
