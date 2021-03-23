import { IUserRepository } from "@/modules/accounts/repositories";
import { ICreateUserDTO } from "@/modules/accounts/dtos";

import { inject } from "tsyringe";

export class CreateUserUseCase {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository
    ) {}

    async execute(data: ICreateUserDTO): Promise<void> {
        await this.userRepository.create({
            name: data.name,
            username: data.username,
            email: data.email,
            driver_license: data.driver_license,
            password: data.password
        })
    }
}