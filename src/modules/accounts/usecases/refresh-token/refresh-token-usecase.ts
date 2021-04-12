import { IUserTokenRepository } from "@/modules/accounts/repositories";
import { IDateProvider } from "@/shared/container/providers";
import { AppError } from "@/shared/errors";

import { verify, sign } from "jsonwebtoken"
import { injectable, inject } from "tsyringe";
import { ICreateUserTokenDTO } from "../../dtos";

interface IPayload {
  sub: string
  email: string
}
interface ITokenResponse {
  token: string
  refresh_token: string
}
@injectable()
export class RefreshTokenUseCase {
  constructor (
    @inject('UserTokenRepository')
    private usersTokenRepository: IUserTokenRepository,
    @inject('DayJSProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute (token: string): Promise<ITokenResponse> {
    const { email, sub } = verify(token, process.env.JWT_SECRET_REFRESH_TOKEN) as IPayload
    const user_id = sub
    const userToken = await this.usersTokenRepository.findByUserIdAndRefreshToken(user_id, token)

    if (!userToken) throw new AppError("Refresh token does not exists!")

    await this.usersTokenRepository.deleteTokenById(userToken.id)

    const refreshToken = sign({ email }, String(process.env.JWT_SECRET_REFRESH_TOKEN), {
      subject: sub,
      expiresIn: process.env.JWT_EXPIRES_IN_REFRESH_TOKEN
    })

    const expires_date = this.dateProvider.addDays(30)

    const userTokenData: ICreateUserTokenDTO = {
      user_id,
      expires_date,
      refresh_token: refreshToken
    }

    await this.usersTokenRepository.create(userTokenData)

    const newToken = sign({}, String(process.env.JWT_SECRET), {
      subject: user_id,
      expiresIn: "15m"
    });

    return {
      token: newToken,
      refresh_token: refreshToken
    }
  }
}