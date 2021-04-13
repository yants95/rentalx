import { IUserTokenRepository, IUserRepository } from '@/modules/accounts/repositories'
import { IDateProvider } from '@/shared/container/providers'
import { AppError } from '@/shared/errors'

import { inject, injectable } from 'tsyringe'
import { hash } from 'bcryptjs'

@injectable()
export class ResetPasswordUseCase {
  constructor (
    @inject('UserTokenRepository')
    private readonly userTokenRepository: IUserTokenRepository,
    @inject('UserRepository')
    private readonly userRepository: IUserRepository,
    @inject('DateProvider')
    private readonly dateProvider: IDateProvider
  ) {}

  async execute (token: string, password: string): Promise<void> {
    const userToken = await this.userTokenRepository.findByRefreshToken(token)
    if (!userToken) throw new AppError('Invalid token.')

    if (this.dateProvider.compareIfBefore(userToken.expires_date, this.dateProvider.dateNow())) {
      if (!userToken) throw new AppError('Token expired.')
    }

    const user = await this.userRepository.findById(userToken.user_id)
    user.password = await hash(password, 8)

    await this.userRepository.create(user)
    await this.userTokenRepository.deleteTokenById(userToken.id)
  }
}
