import { IUsersTokenRepository } from "@/modules/accounts/repositories";
import { UsersToken } from "@/modules/accounts/infra/typeorm/entities";
import { ICreateUsersTokenDTO } from "@/modules/accounts/dtos";

import { getRepository, Repository } from "typeorm";

export class UsersTokenRepository implements IUsersTokenRepository {
  private repository: Repository<UsersToken>

  constructor () {
    this.repository = getRepository(UsersToken)
  }

  async create (data: ICreateUsersTokenDTO): Promise<UsersToken> {
    const userToken = this.repository.create({
      user_id: data.user_id,
      expires_date: data.expires_date,
      refresh_token: data.refresh_token
    })

    return await this.repository.save(userToken);
  }
}