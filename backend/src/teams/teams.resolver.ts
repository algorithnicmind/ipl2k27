import { Resolver, Query, Args } from '@nestjs/graphql';
import { Team } from './team.model';
import { TeamsService } from './teams.service';

@Resolver(() => Team)
export class TeamsResolver {
  constructor(private readonly teamsService: TeamsService) {}

  @Query(() => [Team], { name: 'teams' })
  async findAll() {
    return this.teamsService.findAll();
  }

  @Query(() => Team, { name: 'team', nullable: true })
  async findOne(@Args('id') id: string) {
    return this.teamsService.findOne(id);
  }

  @Query(() => Team, { name: 'teamByShortName', nullable: true })
  async findByShortName(@Args('shortName') shortName: string) {
    return this.teamsService.findByShortName(shortName);
  }
}
