import { IUserRepository } from "@/modules/accounts/repositories";
import { ICreateUserDTO } from "@/modules/accounts/dtos";
import { AppError } from "@/shared/errors"

import { inject, injectable } from "tsyringe";
import { hash } from 'bcryptjs'
@injectable()
export class CreateUserUseCase {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository
    ) {}

    async execute(data: ICreateUserDTO): Promise<void> {
        const userExists = await this.userRepository.findByEmail(data.email);

        if (userExists) throw new AppError('User already exists')

        const passwordHash = await hash(data.password, 8)

        await this.userRepository.create({
            name: data.name,
            email: data.email,
            driver_license: data.driver_license,
            password: passwordHash
        })
    }
}