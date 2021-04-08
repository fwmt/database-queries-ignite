import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
     const games = await this.repository
      .createQueryBuilder('games')
      .where(`LOWER(title) LIKE '%${param.toLowerCase()}%'`)
      .getMany();
      // Complete usando query builder
      return games;
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return await this.repository
    .query(`SELECT COUNT(*) FROM games`); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {    
    const users = await getRepository(User).createQueryBuilder('users')
    .innerJoin('users.games','games')
    .where(`games.id = :id`, { id })
    .getMany()
    
    return users;
      //Complete usando query builder
  }
}
