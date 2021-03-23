import { User } from "@/modules/accounts/entities";
import { ICreateUserDTO } from "@/modules/accounts/dtos";

export interface IUserRepository {
   create(data: ICreateUserDTO): Promise<User>;
}