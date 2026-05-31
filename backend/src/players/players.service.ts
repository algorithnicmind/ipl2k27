import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlayersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.player.findMany({
      orderBy: { name: 'asc' },
      include: { team: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.player.findUnique({
      where: { id },
      include: { team: true },
    });
  }

  async findByTeam(teamId: string) {
    return this.prisma.player.findMany({
      where: { teamId },
      orderBy: { name: 'asc' },
    });
  }
}
