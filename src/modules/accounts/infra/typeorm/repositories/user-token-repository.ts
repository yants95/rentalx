import { IUserTokenRepository } from '@/modules/accounts/repositories'
import { UserToken } from '@/modules/accounts/infra/typeorm/entities'
import { ICreateUserTokenDTO } from '@/modules/accounts/dtos'

import { getRepository, Repository } from 'typeorm'
export class UserTokenRepository implements IUserTokenRepository {
  private readonly repository: Repository<UserToken>

  constructor () {
    this.repository = getRepository(UserToken)
  }

  async create (data: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = this.repository.create(data)
    return await this.repository.save(userToken)
  }

  async findByUserIdAndRefreshToken (user_id: string, refresh_token: string): Promise<UserToken> {
    return await this.repository.findOne({ user_id, refresh_token })
  }

  async deleteTokenById (token_id: string): Promise<void> {
    await this.repository.delete(token_id)
  }

  async findByRefreshToken (token: string): Promise<UserToken> {
    return await this.repository.findOne(token)
  }
}
