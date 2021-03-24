import { IUserRepository } from "@/modules/accounts/repositories";
import { AppError } from '@/errors'

import { inject, injectable } from "tsyringe";
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface IResponse {
    user: {
        name: string
        email: string
    },
    token: string
}

@injectable()
export class AuthenticateUserUseCase {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository
    ) {}

    async execute(email: string, password: string): Promise<IResponse> {
        const user = await this.userRepository.findByEmail(email)

        if (!user) throw new AppError('E-mail or password incorrect');

        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) throw new AppError('E-mail or password incorrect');

        const token = sign({}, process.env.JWT_SECRET, {
            subject: user.id,
            expiresIn: '1d'
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            }
        }

        return tokenReturn
    }
}