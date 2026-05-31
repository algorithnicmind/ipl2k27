import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TeamsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.team.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.team.findUnique({
      where: { id },
      include: {
        players: true,
        homeMatches: { take: 5, orderBy: { date: 'desc' } },
        awayMatches: { take: 5, orderBy: { date: 'desc' } },
      },
    });
  }

  async findByShortName(shortName: string) {
    return this.prisma.team.findUnique({
      where: { shortName },
    });
  }
}
