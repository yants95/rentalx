import { IUserRepository } from "@/modules/accounts/repositories";
import { IStorageProvider } from "@/shared/container/providers";

import { inject, injectable } from "tsyringe";
@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute(user_id: string, avatar_file: string): Promise<void> {
    const user = await this.userRepository.findById(user_id)
  
    if (user.avatar) await this.storageProvider.delete(user.avatar, "avatar")
  
    await this.storageProvider.save(avatar_file, "avatar")

    user.avatar = avatar_file;
    await this.userRepository.create(user)
  }
}