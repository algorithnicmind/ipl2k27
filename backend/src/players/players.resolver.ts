import { Resolver, Query, Args } from '@nestjs/graphql';
import { Player } from './player.model';
import { PlayersService } from './players.service';

@Resolver(() => Player)
export class PlayersResolver {
  constructor(private readonly playersService: PlayersService) {}

  @Query(() => [Player], { name: 'players' })
  async findAll() {
    return this.playersService.findAll();
  }

  @Query(() => Player, { name: 'player', nullable: true })
  async findOne(@Args('id') id: string) {
    return this.playersService.findOne(id);
  }

  @Query(() => [Player], { name: 'playersByTeam' })
  async findByTeam(@Args('teamId') teamId: string) {
    return this.playersService.findByTeam(teamId);
  }
}
