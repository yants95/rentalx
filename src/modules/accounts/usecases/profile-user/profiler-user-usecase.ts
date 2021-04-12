
import { IUserRepository } from "@/modules/accounts/repositories";
import { IUserResponseDTO } from "@/modules/accounts/dtos"
import { UserMap } from "@/modules/accounts/mapper"

import { injectable, inject } from "tsyringe";

@injectable()
export class ProfileUserUseCase {
  constructor (
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute (id: string): Promise<IUserResponseDTO> {
    const user = await this.userRepository.findById(id)
    return UserMap.toDTO(user)
  }
}