import { ICreateUsersTokenDTO } from "@/modules/accounts/dtos";
import { UsersToken } from "@/modules/accounts/infra/typeorm/entities"

export interface IUsersTokenRepository {
  create(data: ICreateUsersTokenDTO): Promise<UsersToken>;
}