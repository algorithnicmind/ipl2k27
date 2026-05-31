import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MatchesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(season?: number) {
    return this.prisma.match.findMany({
      where: season ? { season } : undefined,
      orderBy: { date: 'desc' },
      include: { team1: true, team2: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.match.findUnique({
      where: { id },
      include: { team1: true, team2: true },
    });
  }

  async findBySeason(season: number) {
    return this.prisma.match.findMany({
      where: { season },
      orderBy: { matchNumber: 'asc' },
      include: { team1: true, team2: true },
    });
  }

  async findLiveMatches() {
    return this.prisma.match.findMany({
      where: { status: 'LIVE' },
      include: { team1: true, team2: true },
    });
  }

  async findUpcoming(limit: number = 5) {
    return this.prisma.match.findMany({
      where: { status: 'SCHEDULED' },
      orderBy: { date: 'asc' },
      take: limit,
      include: { team1: true, team2: true },
    });
  }
}
