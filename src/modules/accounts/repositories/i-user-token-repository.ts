import { ICreateUserTokenDTO } from "@/modules/accounts/dtos";
import { UserToken } from "@/modules/accounts/infra/typeorm/entities"
export interface IUserTokenRepository {
  create(data: ICreateUserTokenDTO): Promise<UserToken>
  findByUserIdAndRefreshToken(user_id: string, token: string): Promise<UserToken>
  deleteTokenById(token_id: string): Promise<void>
  findByRefreshToken(refresh_token: string): Promise<UserToken>
}