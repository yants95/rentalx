import { IUserRepository } from "@/modules/accounts/repositories";
import { ICreateUserDTO } from "@/modules/accounts/dtos";
import { User } from "@/modules/accounts/infra/typeorm/entities";

export class UserRepositorySpy implements IUserRepository {
    users: User[] = []

    async create(data: ICreateUserDTO): Promise<void> {
        const user = new User()

        Object.assign(user, {
            name: data.name,
            email: data.email,
            password: data.password,
            driver_license: data.driver_license
        })

        await this.users.push(user)
    }

    async findByEmail(email: string): Promise<User> {
        return await this.users.find(user => user.email === email)
    }

    async findById(id: string): Promise<User> {
        return await this.users.find(user => user.id === id)
    }
}