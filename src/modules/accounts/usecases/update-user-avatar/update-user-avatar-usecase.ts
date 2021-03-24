import { IUserRepository } from "@/modules/accounts/repositories";
import { deleteFile } from '@/utils'

import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateUserAvatarUseCase {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository
    ) {}

    async execute(user_id: string, avatar_file: string): Promise<void> {
        const user = await this.userRepository.findById(user_id)

        if (user.avatar_url) await deleteFile(`./tmp/avatar/${user.avatar_url}`)

        user.avatar_url = avatar_file;
        await this.userRepository.create(user)
    }
}