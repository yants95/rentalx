import { IUserRepository, IUserTokenRepository } from "@/modules/accounts/repositories";
import { IDateProvider, IMailProvider } from "@/shared/container/providers";
import { AppError } from "@/shared/errors";
import { ICreateUserTokenDTO } from "@/modules/accounts/dtos";

import { inject, injectable } from "tsyringe"
import { v4 } from "uuid"
import { resolve } from "path"
@injectable()
export class SendForgotPasswordMailUseCase {
  constructor (
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("UserTokenRepository")
    private userTokenRepository: IUserTokenRepository,
    @inject("DayJSProvider")
    private dateProvider: IDateProvider,
    @inject("MailProvider")
    private mailProvider: IMailProvider
  ) {}

  async execute (email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email)
    if (!user) throw new AppError("User not found.")

    const templatePath = resolve(__dirname, "..", "..", "views", "email", "forgot-password.hbs")

    const refreshToken = v4()
    const expiresDate = this.dateProvider.addHours(3)

    const userTokenData: ICreateUserTokenDTO = {
      refresh_token: refreshToken,
      user_id: user.id,
      expires_date: expiresDate
    }

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${refreshToken}`
    }

    await this.userTokenRepository.create(userTokenData)

    await this.mailProvider.sendMail(email, "Password recovery", variables, templatePath)
  }
}
