import { IUserTokenRepository } from "@/modules/accounts/repositories";
import { ICreateUserTokenDTO } from "@/modules/accounts/dtos";
import { UserToken } from "@/modules/accounts/infra/typeorm/entities";

export class UserTokenRepositorySpy implements IUserTokenRepository {
  usersToken: UserToken[] = []

  async create(data: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken()
    Object.assign(userToken, { ...data })
    this.usersToken.push(userToken)
    return userToken
  }

  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserToken> {
    return this.usersToken.find(userToken => userToken.user_id === user_id && userToken.refresh_token === refresh_token)
  }

  async deleteTokenById(token_id: string): Promise<void> {
    const userToken = this.usersToken.find(userToken => userToken.id === token_id)
    this.usersToken.splice(this.usersToken.indexOf(userToken))
  }

  async findByRefreshToken(refresh_token: string): Promise<UserToken> {
    return this.usersToken.find(userToken => userToken.refresh_token === refresh_token)
  }
}