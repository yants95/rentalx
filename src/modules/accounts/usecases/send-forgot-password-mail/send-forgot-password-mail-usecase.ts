import { IUserRepository, IUserTokenRepository } from "@/modules/accounts/repositories";
import { IDateProvider } from "@/shared/container/providers";
import { AppError } from "@/shared/errors";
import { ICreateUserTokenDTO } from "@/modules/accounts/dtos";

import { inject, injectable } from "tsyringe"
import { v4 } from "uuid"

@injectable()
export class SendForgotPasswordMailUseCase {
  constructor (
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("UserTokenRepository")
    private userTokenRepository: IUserTokenRepository,
    @inject("DayJSProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute (email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email)
    if (!user) throw new AppError("User not found.")

    const refreshToken = v4()
    const expiresDate = this.dateProvider.addHours(3)

    const userTokenData: ICreateUserTokenDTO = {
      refresh_token: refreshToken,
      user_id: user.id,
      expires_date: expiresDate
    }

    await this.userTokenRepository.create(userTokenData)
  }
}