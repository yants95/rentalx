import { User } from '@/modules/accounts/infra/typeorm/entities'
import { ICreateUserDTO } from '@/modules/accounts/dtos'
export interface IUserRepository {
  create: (data: ICreateUserDTO) => Promise<User>
  findByEmail: (email: string) => Promise<User>
  findById: (id: string) => Promise<User>
}
