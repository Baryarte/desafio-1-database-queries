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
    const title = this.repository.createQueryBuilder().select("games").from(Game, "games").where(`games.title ilike :string`, { string: `%${param}%`});
    return title.getMany();
      // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query(`SELECT COUNT(*) FROM games`); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
     const usersWithGame = this.repository.createQueryBuilder().select('users.*').innerJoin('Game.users', 'users').where('Game.id=:id', {id: id});
     return usersWithGame.getRawMany();
      // Complete usando query builder
  }
}
